import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import bookingRoute from './routes/BookingRoute'
import mongoose from "mongoose";

const port = process.env.PORT || 8088;

const app = express()

const key = process.env.MONGO_URI;

mongoose
    .connect(key as string)
    .then(() => console.log("Connected to database!"));

app.use(cors());
app.use(express.json());

app.get("/health", async (_req: Request, res: Response) => res.send({ message: "health OK!" }));

app.use("/api/booking/service", bookingRoute)



app.use(express.urlencoded({ extended: true }))


app.listen(port, () => {
    console.log(`SERVER RUNNING ON ${port}`)
})