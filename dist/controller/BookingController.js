"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBooking = void 0;
const booking_1 = __importDefault(require("../models/booking"));
const emailService_1 = require("../services/emailService");
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookingData = req.body;
        const newBooking = new booking_1.default(bookingData);
        yield newBooking.save();
        // Send admin notification
        yield (0, emailService_1.sendAdminNotification)(bookingData);
        // Send user confirmation
        yield (0, emailService_1.sendUserConfirmation)(bookingData.email, bookingData);
        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    }
    catch (error) {
        console.error('SOMETHING WENT WRONG Error creating booking:', error);
        res.status(500).json({ message: 'Error creating booking', error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
exports.createBooking = createBooking;
exports.default = { createBooking: exports.createBooking };
