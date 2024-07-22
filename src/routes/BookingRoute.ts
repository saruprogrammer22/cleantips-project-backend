import express from 'express';
import BookingController from '../controller/BookingController';
const router = express.Router();

router.post('/', BookingController.createBooking);

export default router;