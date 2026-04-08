export interface PaymentBooking {
  _id: string;
  booking_id: string;
}

export interface Payment {
  _id?: string;
  payment_id?: string;
  booking: PaymentBooking | null;
  amount: number;
  provider: string;
  provider_payment_id: string;
  status: string;
  receipt_url: string;
}

export type PaymentFormData = Omit<Payment, "_id" | "booking"> & {
  booking?: string | null;
};
