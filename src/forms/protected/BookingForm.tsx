import { FC } from "react";
import { Controller } from "react-hook-form";
import { useBookingForm } from "../../hooks";
import {
    Button, DatePicker, FormSelect, Input, Label, Switch, TextArea,
} from "../../components/ui/forms";



const Field: FC<{ label: string; error?: string; children: React.ReactNode }> = ({
    label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) => (
    <div>
        <Label>{label}</Label>
        {children}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
);

const BookingForm = () => {
    const { booking, form, options, onSubmit } = useBookingForm();
    const { register, handleSubmit, control, watch, setValue, getValues,
        formState: { errors } } = form;

    return (
        <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-4 lg:p-11">
            <div className="px-2 pr-14">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800">
                    {booking ? "Edit" : "Add"} Booking
                </h4>
                <p className="mb-6 text-sm text-gray-500 lg:mb-7">
                    {booking ? "Update booking details." : "Fill the form to add a new booking."}
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <h5 className="mb-5 text-lg font-medium text-gray-800 lg:mb-6">Booking Information</h5>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">

                    {/* Event Date */}
                    <Field label="Event Date" error={errors.event_date?.message}>
                        <input type="hidden" {...register("event_date", { required: "Event date is required" })} />
                        <DatePicker
                            id="eventDate"
                            placeholder="Select event date"
                            defaultDate={getValues("event_date")}
                            onChange={([date]) =>
                                setValue("event_date", date?.toISOString().split("T")[0] ?? "", { shouldValidate: true })
                            }
                        />
                    </Field>

                    {/* Event Time */}
                    <Field label="Event Time" error={errors.event_time?.message}>
                        <Input type="time" {...register("event_time", { required: "Event time is required" })} />
                    </Field>

                    {/* Artist */}
                    <Field label="Artist" error={errors.artist?.message}>
                        <FormSelect options={options.artists} placeholder="Select Artist" {...register("artist")} />
                    </Field>

                    {/* Location */}
                    <Field label="Event Location" error={errors.event_loc?.message}>
                        <FormSelect options={options?.locations ?? []} placeholder="Select Location" {...register("event_loc")} />
                    </Field>

                    {/* User */}
                    <Field label="User" error={errors.user?.message}>
                        <FormSelect options={options.users} placeholder="Select User" {...register("user")} />
                    </Field>

                    {/* Package */}
                    <Field label="Package" error={errors.package?.message}>
                        <FormSelect options={options.packages} placeholder="Select Package" {...register("package")} />
                    </Field>

                    {/* Event Type */}
                    <Field label="Event Type" error={errors.event_type?.message}>
                        <FormSelect options={options.eventTypes} placeholder="Select Event Type" {...register("event_type")} />
                    </Field>

                    {/* Payment */}
                    <Field label="Payment" error={errors.payment?.message}>
                        <FormSelect options={options.payments} placeholder="Select Payment" {...register("payment")} />
                    </Field>

                    {/* Attendees */}
                    <Field label="Attendees" error={errors.attendees?.message}>
                        <Input type="number" {...register("attendees", { required: "Attendees is required" })} />
                    </Field>

                    {/* Budget */}
                    <Field label="Budget" error={errors.budget?.message}>
                        <Input type="number" {...register("budget", { required: "Budget is required" })} />
                    </Field>

                    {/* Contract Term */}
                    <Field label="Contract Term" error={errors.contract_term?.message}>
                        <Controller control={control} name="contract_term" render={({ field }) => (
                            <TextArea value={field.value} onChange={field.onChange} placeholder="Contract term"
                                error={!!errors.contract_term} />
                        )} />
                    </Field>

                    {/* Status */}
                    <Field label="Status" error={errors.status?.message}>
                        <FormSelect options={options.status} placeholder="Select Status"
                            {...register("status", { required: "Status is required" })} />
                    </Field>

                    {/* Switches */}
                    {(["accepted_by_user", "accepted_by_artist"] as const).map((field) => (
                        <Field key={field} label={field === "accepted_by_user" ? "Accepted by user?" : "Accepted by artist?"}>
                            <div className="flex gap-5 px-2">
                                <Switch
                                    label={watch(field) ? "Yes" : "No"}
                                    defaultChecked={watch(field)}
                                    onChange={(v) => setValue(field, v)}
                                />
                            </div>
                        </Field>
                    ))}
                </div>

                {/* Admin Note — full width */}
                <Field label="Admin Note" error={errors.admin_note?.message}>
                    <Controller control={control} name="admin_note" render={({ field }) => (
                        <TextArea value={field.value} onChange={field.onChange} placeholder="Admin note"
                            error={!!errors.admin_note} />
                    )} />
                </Field>

                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                    <Button size="sm" variant="primary" type="submit">
                        {booking ? "Update" : "Save"} Booking
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default BookingForm;