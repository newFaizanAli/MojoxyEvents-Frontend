import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { Booking, BookingFormData } from "../types";
import {
  useArtistStore,
  useBookingStore,
  usePackageStore,
  usePaymentStore,
  useUsersStore,
} from "../store";
import { CITIESLIST, EVENT_TYPES } from "../utilities/constants";

const DEFAULT_VALUES: BookingFormData = {
  booking_id: "",
  user: null,
  artist: null,
  package: null,
  event_type: "",
  event_loc: "",
  payment: null,
  event_date: "",
  event_time: "",
  admin_note: "",
  accepted_by_user: false,
  accepted_by_artist: false,
  contract_term: "",
  attendees: 0,
  budget: 0,
  status: "pending",
};

export function useBookingForm() {
  const { addBooking, updateBooking, fetchBookingById } = useBookingStore();
  const { artists, isFetched: isArtistFetch, fetchArtists } = useArtistStore();
  const { users, isFetched: isUserFetch, fetchUsers } = useUsersStore();
  const {
    artist_packages,
    isFetched: isPackageFetch,
    fetchPackages,
  } = usePackageStore();
  const {
    payments,
    isFetched: isPaymentFetch,
    fetchPayments,
  } = usePaymentStore();

  const { state } = useLocation();
  const bookingId: string | undefined = state?.bookingId;

  const [booking, setBooking] = useState<Booking | null>(null);

  const allFetched =
    isArtistFetch && isUserFetch && isPackageFetch && isPaymentFetch;

  const form = useForm<BookingFormData>({ defaultValues: DEFAULT_VALUES });
  const { reset, watch, setValue } = form;

  const selectedArtist = watch("artist");

  // ── 1. Fetch all stores once ──────────────────────────────
  useEffect(() => {
    if (!isArtistFetch) fetchArtists();
    if (!isUserFetch) fetchUsers();
    if (!isPackageFetch) fetchPackages();
    if (!isPaymentFetch) fetchPayments();
  }, [
    isArtistFetch,
    isUserFetch,
    isPackageFetch,
    isPaymentFetch,
    fetchArtists,
    fetchUsers,
    fetchPackages,
    fetchPayments,
  ]);

  // ── 2. Load booking for edit ──────────────────────────────
  useEffect(() => {
    if (!allFetched) return;

    if (!bookingId) {
      setBooking(null);
      reset(DEFAULT_VALUES);
      return;
    }

    fetchBookingById(bookingId).then((fetched) => {
      if (!fetched) return;
      setBooking(fetched);
      reset({
        ...DEFAULT_VALUES,
        user: fetched.user?._id ?? null,
        artist: fetched.artist?._id ?? null,
        package: fetched.package?._id ?? null,
        payment: fetched.payment?._id ?? null,
        event_type: fetched.event_type ?? "",
        event_loc: fetched.event_loc ?? "",
        event_date: fetched.event_date ?? "",
        event_time: fetched.event_time ?? "",
        accepted_by_user: fetched.accepted_by_user ?? false,
        accepted_by_artist: fetched.accepted_by_artist ?? false,
        contract_term: fetched.contract_term ?? "",
        admin_note: fetched.admin_note ?? "",
        attendees: fetched.attendees ?? 0,
        budget: fetched.budget ?? 0,
        status: fetched.status ?? "pending",
      });
    });
  }, [allFetched, bookingId, fetchBookingById, reset]);

  // ── 3. Derived: packages & event types for selected artist ─
  const { filteredPackages, filteredEventTypes } = useMemo(() => {
    if (!selectedArtist)
      return { filteredPackages: [], filteredEventTypes: [] };

    const artistObj = artists.find(
      (a) => String(a._id) === String(selectedArtist),
    );

    const filteredPackages = artist_packages.filter(
      (pkg) => pkg.artist?._id === selectedArtist,
    );

    const artistEventTypeSet = new Set(
      artistObj?.event_types?.map(String) ?? [],
    );
    const filteredEventTypes = artistEventTypeSet.size
      ? EVENT_TYPES.filter((et) => artistEventTypeSet.has(String(et.value)))
      : [];

    return { filteredPackages, filteredEventTypes };
  }, [selectedArtist, artist_packages, artists]);

  // ── 4. Reset dependent fields on artist change (create only) ─
  useEffect(() => {
    if (bookingId) return; // don't wipe on edit
    setValue("package", null);
    setValue("event_type", "");
  }, [selectedArtist, bookingId, setValue]);

  // ── 5. Submit ─────────────────────────────────────────────
  const onSubmit = async (data: BookingFormData) => {
    const find = <T extends { _id?: string }>(list: T[], id: unknown) =>
      list.find((e) => String(e._id) === String(id));

    const fullArtist = find(artists, data.artist);
    const fullUser = find(users, data.user);
    const fullPackage = find(artist_packages, data.package);
    const fullPayment = find(payments, data.payment);

    const payload: Omit<Booking, "_id"> = {
      ...data,
      artist: fullArtist
        ? { _id: String(fullArtist._id), stage_name: fullArtist.stage_name }
        : null,
      user: fullUser
        ? {
            _id: String(fullUser._id),
            name: fullUser.name,
            email: fullUser.email,
          }
        : null,
      package: fullPackage
        ? {
            _id: String(fullPackage._id),
            title: fullPackage.title,
            capacity: fullPackage.capacity,
          }
        : null,
      payment: fullPayment
        ? {
            _id: String(fullPayment._id),
            payment_id: fullPayment.payment_id ?? "",
          }
        : null,
    };

    if (booking) {
      await updateBooking(booking._id!, payload);
    } else {
      await addBooking(payload);
    }
  };

  // ── 6. Select options (memoised) ──────────────────────────
  const options = useMemo(
    () => ({
      artists: artists.map((a) => ({
        value: a._id ?? "",
        label: a.stage_name ?? "Unnamed Artist",
      })),
      users: users.map((u) => ({
        value: u._id ?? "",
        label: `${u.name} (${u.email})`,
      })),
      packages: filteredPackages.map((p) => ({
        value: p._id ?? "",
        label: p.title ?? "Unnamed Package",
      })),
      payments: payments.map((p) => ({
        value: p._id ?? "",
        label: p.payment_id ?? "Unknown",
      })),
      locations: CITIESLIST?.map((c) => ({ value: c.value, label: c.label })),
      eventTypes: filteredEventTypes.map((et) => ({
        value: et.value,
        label: et.label,
      })),
      status: [
        { value: "pending", label: "Pending" },
        { value: "in_progress", label: "In Progress" },
        { value: "approved", label: "Approved" },
        { value: "cancel", label: "Cancel" },
      ],
    }),
    [artists, users, filteredPackages, payments, filteredEventTypes],
  );

  return { booking, form, options, onSubmit };
}
