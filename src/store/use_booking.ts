import axios from "../services/axios_config";
import { create } from "zustand";
import { Booking } from "../types";
import { END_POINT_API } from "../config";
import { toastError, toastSuccess } from "../utilities";

interface BookingState {
  bookings: Booking[];
  isFetched: boolean;

  fetchBookings: () => Promise<void>;
  addBooking: (booking: Omit<Booking, "_id">) => Promise<void>;
  fetchSelfBookings: () => Promise<Booking[] | undefined>;
  fetchArtistBookings: () => Promise<Booking[] | undefined>;
  fetchBookingById: (id: string) => Promise<Booking | null>;
  acceptArtistBooking: (id: string) => Promise<Booking | null>;
  updateBooking: (id: string, booking: Partial<Booking>) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
}

const useBookingStore = create<BookingState>((set, get) => ({
  bookings: [],
  isFetched: false,

  fetchBookings: async () => {
    const { isFetched } = get();
    if (isFetched) return;

    try {
      const response = await axios.get(`${END_POINT_API?.BOOKING?.BASE}`);

      set({ bookings: response.data, isFetched: true });
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch booking");
    }
  },

  fetchSelfBookings: async () => {
    const { isFetched } = get();
    if (isFetched) return;

    try {
      const response = await axios.get(`${END_POINT_API?.BOOKING?.SELF}`);

      return response?.data;
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch booking");
    }
  },

  fetchArtistBookings: async () => {
    const { isFetched } = get();
    if (isFetched) return;

    try {
      const response = await axios.get(`${END_POINT_API?.BOOKING?.ARTIST}`);

      return response?.data;
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch artist booking");
    }
  },

  fetchBookingById: async (id: string) => {
    try {
      const response = await axios.get(`${END_POINT_API?.BOOKING?.BY_ID(id)}`);

      return response.data;
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch booking");
    }
  },

  acceptArtistBooking: async (id: string) => {
    try {
      const response = await axios.post(
        `${END_POINT_API?.BOOKING?.ACCEPT(id)}`,
      );

      set((state) => ({
        bookings: state.bookings.map((b) =>
          String(b._id) === String(id) ? { ...b, ...response.data } : b,
        ),
      }));

      return response.data;
    } catch (error) {
      console.error("Error accepting booking:", error);
      throw error;
    }
  },

  addBooking: async (booking) => {
    try {
      const response = await axios.post(
        `${END_POINT_API?.BOOKING?.BASE}`,
        booking,
      );

      const newBooking = response.data;

      if (newBooking.success) {
        toastSuccess(newBooking.message || "Booking added successfully");
        set((state) => ({
          bookings: [...state.bookings, newBooking.data],
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to add booking");
    }
  },

  updateBooking: async (id, booking) => {
    try {
      const resp = await axios.put(
        `${END_POINT_API?.BOOKING?.BY_ID(id)}`,
        booking,
      );

      if (resp.data.success) {
        toastSuccess(resp.data.message || "Booking updated successfully");

        set((state) => ({
          bookings: state.bookings.map((t) =>
            String(t._id) === String(id) ? resp.data.data : t,
          ),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to update booking");
    }
  },

  deleteBooking: async (id) => {
    try {
      const resp = await axios.delete(`${END_POINT_API?.BOOKING?.BY_ID(id)}`);

      if (resp.data.success) {
        toastSuccess(resp.data.message || "Booking deleted successfully");

        set((state) => ({
          bookings: state?.bookings?.filter(
            (u) => String(u._id) !== String(id),
          ),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to delete booking");
    }
  },
}));

export default useBookingStore;
