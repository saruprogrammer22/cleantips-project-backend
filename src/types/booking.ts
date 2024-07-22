export type IBooking = {
    email: string;
    name: string;
    phone: string;
    location: string;
    message?: string;
    serviceType: string;
    date: Date;
    time: string;
    isSubscribe: boolean;
}