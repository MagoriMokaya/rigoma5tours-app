import { buffer } from 'micro';
import { supabase } from '../lib/supabaseClient';
import { stripe } from '../lib/stripeClient';

// Disable Vercel's body parser so we can read raw body
export const config = {
    api: {
        bodyParser: false,
    },
};

const webhookHandler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    let event;
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    try {
        event = stripe.webhooks.constructEvent(
            buf,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle different event types as needed
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object;
            const bookingId = session.metadata?.booking_id;
            const customerEmail = session.customer_details?.email;

            if (bookingId) {
                // Update booking status and store Stripe session id
                const { error } = await supabase
                    .from('bookings')
                    .update({
                        status: 'confirmed',
                        stripe_session_id: session.id,
                        customer_email: customerEmail,
                        payment_status: session.payment_status,
                    })
                    .eq('id', bookingId);

                if (error) {
                    console.error('Supabase update error:', error);
                    return res.status(500).json({ error: 'Database update failed' });
                }
            }
            break;
        }
        case 'payment_intent.payment_failed': {
            const paymentIntent = event.data.object;
            const bookingId = paymentIntent.metadata?.booking_id;

            if (bookingId) {
                // Optionally update booking status to failed
                await supabase
                    .from('bookings')
                    .update({ status: 'payment_failed' })
                    .eq('id', bookingId);
            }
            break;
        }
        // Add more event types as needed for your app
        default:
            // Ignore unhandled event types
            break;
    }

    res.json({ received: true });
};

export default webhookHandler;