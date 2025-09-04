import { createClient } from '@supabase/supabase-js';
import { stripe } from '../lib/stripeClient';

// Initialize Supabase client with environment variables
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key for server-side ops
);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { customerName, customerEmail, tourId, packageClass, numPeople } = req.body;

    if (!customerName || !customerEmail || !tourId || !packageClass || !numPeople) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // 1. Fetch tour details from Supabase
    const { data: tour, error: tourError } = await supabase
        .from('tours')
        .select('id,title,price_economy,price_luxury,price_executive')
        .eq('id', tourId)
        .single();

    if (tourError || !tour) {
        return res.status(404).json({ error: 'Tour not found' });
    }

    // 2. Map package class to price
    const priceMap = {
        economy: tour.price_economy,
        luxury: tour.price_luxury,
        executive: tour.price_executive,
    };

    const unitAmount = Math.round((priceMap[packageClass] || 0) * 100);

    if (!unitAmount) {
        return res.status(400).json({ error: 'Invalid package class' });
    }

    // 3. Create a pending booking in Supabase
    const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert([
            {
                customer_name: customerName,
                customer_email: customerEmail,
                tour_id: tourId,
                package_class: packageClass,
                num_people: numPeople,
                total_price: (unitAmount * numPeople) / 100,
                status: 'pending',
                created_at: new Date().toISOString(),
            }
        ])
        .select('id')
        .single();

    if (bookingError || !booking) {
        return res.status(500).json({ error: 'Failed to create booking' });
    }

    // 4. Create Stripe Checkout Session
    try {
        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${tour.title} - ${packageClass.charAt(0).toUpperCase() + packageClass.slice(1)} Package`,
                            description: `${numPeople} person(s)`,
                        },
                        unit_amount: unitAmount,
                    },
                    quantity: numPeople,
                },
            ],
            success_url: `${process.env.APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.APP_URL}/booking?tourId=${tourId}`,
            metadata: {
                booking_id: booking.id,
                tour_id: tourId,
                customer_email: customerEmail,
            },
        });

        return res.status(200).json({ url: session.url });
    } catch (err) {
        // Optionally, update booking status to 'failed'
        await supabase
            .from('bookings')
            .update({ status: 'failed' })
            .eq('id', booking.id);

        return res.status(500).json({ error: 'Stripe session creation failed' });
    }
}