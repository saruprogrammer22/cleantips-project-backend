import mongoose, { Schema } from 'mongoose';
import { IBooking } from '../types/booking';

const bookingSchema = new Schema<IBooking>({
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String },
    location: { type: String, required: true },
    serviceType: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    isSubscribe: { type: Boolean, default: false },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;