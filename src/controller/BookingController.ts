import { Request, Response } from 'express';

import { IBooking } from '../types/booking';
import Booking from '../models/booking';
import { sendAdminNotification, sendUserConfirmation } from '../services/emailService';

export const createBooking = async (req: Request, res: Response) => {
    try {
        const bookingData: IBooking = req.body;
        const newBooking = new Booking(bookingData);
        await newBooking.save();

        // Send admin notification
        await sendAdminNotification(bookingData);

        // Send user confirmation
        await sendUserConfirmation(bookingData.email, bookingData);

        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        console.error('SOMETHING WENT WRONG Error creating booking:', error);
        res.status(500).json({ message: 'Error creating booking', error: error instanceof Error ? error.message : 'Unknown error' });
    }
};

export default { createBooking };