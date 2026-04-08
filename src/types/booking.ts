export interface BookingUser {
  _id: string;
  name: string;
  email: string;
}

export interface BookingArtist {
  _id: string;
  stage_name: string;
}

export interface BookingPackage {
  _id: string;
  title: string;
  capacity: number;
}

export interface BookingPayment {
  _id: string;
  payment_id: string;
}

export interface Booking {
  _id?: string;
  booking_id?: string;
  user: BookingUser | null;
  artist: BookingArtist | null;
  package: BookingPackage | null;
  payment: BookingPayment | null;
  event_type: string;
  event_date: string;
  event_time: string;
  admin_note: string;
  accepted_by_user: boolean;
  accepted_by_artist: boolean;
  contract_term: string;
  attendees: number;
  budget: number;
  event_loc: string;
  status: "pending" | "in_progress" | "approved" | "cancel";
}

export type BookingFormData = Omit<
  Booking,
  "_id" | "user" | "artist" | "package" | "payment"
> & {
  user?: string | null;
  artist?: string | null;
  package?: string | null;
  payment?: string | null;
};

export interface BookingFormErrors {
  package?: string;
  event_date?: string;
  event_time?: string;
  event_loc?: string;
  event_type?: string;
  attendees?: string;
  budget?: string;
  contract_term?: string;
  admin_note?: string;
  accepted_by_artist?: string;
  accepted_by_user?: string;
  user?: string;
  artist?: string;
}
