import React, { useEffect, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router";

import { Payment, PaymentFormData } from "../../types";
import { usePaymentStore, useBookingStore } from "../../store";
import { Button, Input, Label, Radio, FormSelect } from "../../components/ui/forms";

const DEFAULT_VALUES: PaymentFormData = {
    payment_id: "",
    booking: null,
    amount: 0,
    provider: "manual",
    provider_payment_id: "",
    status: "initiated",
    receipt_url: "",
};

const PROVIDERS = ["jazzcash", "easypaisa", "wallet", "manual"];
const STATUSES = ["initiated", "succeeded", "failed", "refund"];

const PaymentForm = React.memo(() => {
    const { addPayment, updatePayment, fetchPaymentById } = usePaymentStore();
    const { bookings, isFetched, fetchBookings } = useBookingStore();



    const { payment_id } = useParams<{ payment_id?: string }>();
    const bookingId = useLocation()?.state?.bookingId;

    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        formState: { errors },
    } = useForm<PaymentFormData>({ defaultValues: DEFAULT_VALUES });


    useEffect(() => {
        if (!isFetched) fetchBookings();
    }, [isFetched, fetchBookings]);


    useEffect(() => {
        if (!payment_id) {
            reset(DEFAULT_VALUES);
            return;
        }

        (async () => {
            const data = await fetchPaymentById(payment_id);
            if (!data) return;

            reset({
                ...DEFAULT_VALUES,
                ...data,
                booking: data.booking?._id || null,
            });
        })();
    }, [payment_id, fetchPaymentById, reset]);


    useEffect(() => {
        if (bookingId && !payment_id) {
            setValue("booking", bookingId);
        }
    }, [bookingId, payment_id, setValue]);


    const bookingOptions = useMemo(
        () =>
            bookings.map((b) => ({
                value: b?._id || "",
                label: b?.booking_id || "Unknown",
            })),
        [bookings]
    );


    const onSubmit = useCallback(
        (data: PaymentFormData) => {
            const booking = bookings.find(
                (b) => String(b._id) === String(data.booking)
            );

            const payload: Omit<Payment, "_id"> = {
                ...data,
                booking: booking
                    ? {
                        _id: String(booking._id),
                        booking_id: booking.booking_id ?? "",
                    }
                    : null,
            };

            if (payment_id) {
                updatePayment(payment_id, payload);
            } else {
                addPayment(payload);
            }
        },
        [bookings, payment_id, addPayment, updatePayment]
    );



    return (
        <div className="no-scrollbar w-full overflow-y-auto rounded-3xl bg-white p-4 lg:p-11">
            <h4 className="text-2xl font-semibold mb-2">
                {payment_id ? "Edit" : "Add"} Payment
            </h4>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-5">

                    {/* Booking */}
                    <div>
                        <Label>Booking</Label>
                        <FormSelect
                            options={bookingOptions}
                            {...register("booking")}
                        />
                        {errors.booking && <p className="text-red-500">{errors.booking.message}</p>}
                    </div>

                    {/* Amount */}
                    <div>
                        <Label>Amount</Label>
                        <Input type="number" {...register("amount", { required: "Required" })} />
                        {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
                    </div>

                    {/* Provider Payment ID */}
                    <div>
                        <Label>Provider Payment ID</Label>
                        <Input {...register("provider_payment_id")} />
                        {errors.provider_payment_id && (
                            <p className="text-red-500">{errors.provider_payment_id.message}</p>
                        )}
                    </div>

                    {/* Provider */}
                    <div>
                        <Label>Provider</Label>
                        <div className="flex gap-2">
                            {PROVIDERS.map((prv, idx) => (
                                <Radio
                                    key={idx}
                                    id={`gender-${prv}`}
                                    name="provider"
                                    value={prv}
                                    label={prv.charAt(0).toUpperCase() + prv.slice(1)}
                                    inputRef={register("provider").ref}
                                    onInputChange={register("provider").onChange}
                                    checked={watch("provider") === prv}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Receipt URL */}
                    <div>
                        <Label>Receipt URL</Label>
                        <Input {...register("receipt_url")} />
                        {errors.receipt_url && (
                            <p className="text-red-500">{errors.receipt_url.message}</p>
                        )}
                    </div>

                    {/* Status */}
                    <div>
                        <Label>Status</Label>
                        <div className="flex gap-2">
                            {STATUSES.map((st, idx) => (
                                <Radio
                                    key={idx}
                                    id={`status-${st}`}
                                    name="status"
                                    value={st}
                                    label={st.charAt(0).toUpperCase() + st.slice(1)}
                                    inputRef={register("status").ref}
                                    onInputChange={register("status").onChange}
                                    checked={watch("status") === st}
                                />
                            ))}
                        </div>
                    </div>

                </div>

                <Button size="sm" type="submit">
                    {payment_id ? "Update" : "Save"}
                </Button>
            </form>
        </div>
    );
});

export default PaymentForm;