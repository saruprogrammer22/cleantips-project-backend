import nodemailer from 'nodemailer';
import { IBooking } from '../types/booking';


// Ensure that you have set up the environment variables before using them.
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT ? parseInt(process.env.MAIL_PORT, 10) : 587, // Use a default port if not provided
    secure: process.env.MAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});

export const sendAdminNotification = async (bookingData: IBooking): Promise<void> => {
    const mailOptions = {
        from: process.env.OWNER_EMAIL,
        to: bookingData.email,
        subject: 'New Booking Notification',
        html: `
            <h1>New Booking Received</h1>
            <p>A new booking has been made:</p>
            <ul>
                <li>Name: ${bookingData.name}</li>
                <li>Email: ${bookingData.email}</li>
                <li>Phone: ${bookingData.phone}</li>
                <li>Service Type: ${bookingData.serviceType}</li>
                <li>Date: ${bookingData.date}</li>
                <li>Time: ${bookingData.time}</li>
                <li>Time: ${bookingData.location}</li>
                <li>Message: ${bookingData.message || 'N/A'}</li>
                <li>Subscribe to newsletter: ${bookingData.isSubscribe ? 'Yes' : 'No'}</li>
            </ul>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Admin notification sent successfully');
    } catch (error) {
        console.error('Error sending admin notification:', error);
        throw error;
    }
};

export const sendUserConfirmation = async (to: string, bookingData: IBooking): Promise<void> => {
    const mailOptions = {
        from: process.env.OWNER_EMAIL,
        to,
        subject: 'Booking Confirmation',
        html: `
            <h1>Booking Confirmation</h1>
            <p>Thank you for booking our cleaning service!</p>
            <p>Details:</p>
            <ul>
                <li>Name: ${bookingData.name}</li>
                <li>Service Type: ${bookingData.serviceType}</li>
                <li>Date: ${bookingData.date}</li>
                <li>Time: ${bookingData.time}</li>
                 <li>Location: ${bookingData.location}</li>
            </ul>
            <h1>CleanTips Services</h1>
            <a title="cleantips" rel="noopener" target="_blank" href="http://localhost:5173">http://localhost:5173</a>
            <p>We look forward to serving you!</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('User confirmation sent successfully');
    } catch (error) {
        console.error('Error sending user confirmation:', error);
        throw error;
    }
};