import axios from "../services/axios_config";
import { create } from "zustand";
import { Payment } from "../types";
import { END_POINT_API } from "../config";
import { toastError, toastSuccess } from "../utilities";

interface PaymentState {
  payments: Payment[];
  isFetched: boolean;

  fetchPayments: () => Promise<void>;
  addPayment: (payment: Omit<Payment, "_id">) => Promise<void>;
  fetchPaymentById: (id: string) => Promise<Payment | null>;
  updatePayment: (id: string, payment: Partial<Payment>) => Promise<void>;
  deletePayment: (id: string) => Promise<void>;
}

const usePaymentStore = create<PaymentState>((set, get) => ({
  payments: [],
  isFetched: false,

  fetchPayments: async () => {
    const { isFetched } = get();
    if (isFetched) return;

    try {
      const response = await axios.get(`${END_POINT_API?.PAYMENT?.BASE}`);
      set({ payments: response.data, isFetched: true });
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch payments");
    }
  },

  fetchPaymentById: async (id: string) => {
    try {
      const response = await axios.get(`${END_POINT_API?.PAYMENT?.BY_ID(id)}`);
      return response.data;
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch payment");
    }
  },

  addPayment: async (payment) => {
    try {
      const response = await axios.post(
        `${END_POINT_API?.PAYMENT?.BASE}`,
        payment,
      );

      const newPayment = response.data;

      if (newPayment.success) {
        toastSuccess(newPayment.message || "Payment added successfully");
        set((state) => ({
          payments: [...state.payments, newPayment.data],
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to add payment");
    }
  },

  updatePayment: async (id, payment) => {
    try {
      const resp = await axios.put(
        `${END_POINT_API?.PAYMENT?.BY_ID(id)}`,
        payment,
      );

      if (resp.data.success) {
        toastSuccess(resp.data.message || "Payment updated successfully");

        set((state) => ({
          payments: state.payments.map((t) =>
            String(t._id) === String(id) ? resp.data.data : t,
          ),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to update payment");
    }
  },

  deletePayment: async (id) => {
    try {
      const resp = await axios.delete(`${END_POINT_API?.PAYMENT?.BY_ID(id)}`);

      if (resp.data.success) {
        toastSuccess(resp.data.message || "Payment deleted successfully");
        set((state) => ({
          payments: state.payments.filter((u) => String(u._id) !== String(id)),
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to delete payment");
    }
  },
}));

export default usePaymentStore;
