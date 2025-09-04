import React, { useState } from 'react';

const initialFormState = {
    name: '',
    email: '',
    phone: '',
    tourDate: '',
    guests: 1,
    specialRequests: '',
};

const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePhone = (phone) =>
    /^\+?\d{7,15}$/.test(phone);

export default function BookingForm({ onSubmit }) {
    const [form, setForm] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'guests' ? Math.max(1, Number(value)) : value,
        }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Name is required.';
        if (!validateEmail(form.email)) newErrors.email = 'Valid email required.';
        if (!validatePhone(form.phone)) newErrors.phone = 'Valid phone required.';
        if (!form.tourDate) newErrors.tourDate = 'Tour date is required.';
        if (form.guests < 1) newErrors.guests = 'At least one guest required.';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length) {
            setErrors(validationErrors);
            return;
        }
        setSubmitting(true);
        try {
            // Simulate API call
            await new Promise((res) => setTimeout(res, 1200));
            setSuccess(true);
            setForm(initialFormState);
            if (onSubmit) onSubmit(form);
        } catch (err) {
            setErrors({ form: 'Submission failed. Try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form className="booking-form" onSubmit={handleSubmit} noValidate>
            <h2>Book Your Tour</h2>
            {success && (
                <div className="success-message">
                    Booking successful! We’ll contact you soon.
                </div>
            )}
            {errors.form && (
                <div className="error-message">{errors.form}</div>
            )}
            <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={submitting}
                    required
                />
                {errors.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={submitting}
                    required
                />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone *</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={submitting}
                    required
                />
                {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="tourDate">Tour Date *</label>
                <input
                    type="date"
                    id="tourDate"
                    name="tourDate"
                    value={form.tourDate}
                    onChange={handleChange}
                    disabled={submitting}
                    required
                    min={new Date().toISOString().split('T')[0]}
                />
                {errors.tourDate && <span className="error">{errors.tourDate}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="guests">Number of Guests *</label>
                <input
                    type="number"
                    id="guests"
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    disabled={submitting}
                    min={1}
                    required
                />
                {errors.guests && <span className="error">{errors.guests}</span>}
            </div>
            <div className="form-group">
                <label htmlFor="specialRequests">Special Requests</label>
                <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={form.specialRequests}
                    onChange={handleChange}
                    disabled={submitting}
                    rows={3}
                />
            </div>
            <button
                type="submit"
                className="submit-btn"
                disabled={submitting}
            >
                {submitting ? 'Booking...' : 'Book Now'}
            </button>
            <style jsx>{`
                .booking-form {
                    max-width: 400px;
                    margin: 2rem auto;
                    padding: 2rem;
                    background: #fff;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                }
                .form-group {
                    margin-bottom: 1.2rem;
                }
                label {
                    display: block;
                    margin-bottom: 0.4rem;
                    font-weight: 500;
                }
                input, textarea {
                    width: 100%;
                    padding: 0.6rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 1rem;
                }
                .error {
                    color: #d32f2f;
                    font-size: 0.9rem;
                }
                .error-message, .success-message {
                    margin-bottom: 1rem;
                    padding: 0.8rem;
                    border-radius: 4px;
                    font-size: 1rem;
                }
                .error-message {
                    background: #ffeaea;
                    color: #d32f2f;
                }
                .success-message {
                    background: #eaffea;
                    color: #388e3c;
                }
                .submit-btn {
                    width: 100%;
                    padding: 0.8rem;
                    background: #1976d2;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    font-size: 1.1rem;
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .submit-btn:disabled {
                    background: #90caf9;
                    cursor: not-allowed;
                }
            `}</style>
        </form>
    );
}