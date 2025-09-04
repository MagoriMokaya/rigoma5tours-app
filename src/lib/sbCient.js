import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fetch all tours
export async function getAllTours() {
    const { data, error } = await supabase
        .from('tours')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching tours:', error.message);
        return [];
    }
    return data || [];
}

// Fetch a single tour by ID
export async function getTourById(id) {
    const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching tour:', error.message);
        return null;
    }
    return data;
}

// Create a new booking
export async function createBooking(booking) {
    const { data, error } = await supabase
        .from('bookings')
        .insert([booking])
        .select('id')
        .single();

    if (error) {
        console.error('Error creating booking:', error.message);
        return null;
    }
    return data?.id || null;
}

// Fetch all bookings for a user (optional utility)
export async function getBookingsByUser(userId) {
    const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching bookings:', error.message);
        return [];
    }
    return data || [];
}