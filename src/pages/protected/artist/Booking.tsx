import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Loader } from "lucide-react";
import { BookingFormData } from "../../../types/booking";
import { Artist, Booking, BookingFormErrors, Package } from "../../../types";
import { useArtistStore, useBookingStore, usePackageStore } from "../../../store";
import { CITIESLIST, EVENT_TYPES } from "../../../utilities/constants";
import { PageMeta } from "../../../components/shared";
import {
    BookingHeader, BookingStepper, BookingPackageEvent,
    BookingDateTimeLoc, BookingBudget, BookingSuccess
} from "../../../components/pages/artist/booking";




const ArtistBooking = () => {
    const { slug } = useParams();
    const [step, setStep] = useState(1);
    const [artist, setArtist] = useState<Artist | null>(null);
    const [artistPackages, setArtistPackages] = useState<Package[]>([]);
    const { artists, fetchArtistByStageName, fetchArtistBookingDetails } = useArtistStore();
    const { addBooking } = useBookingStore();
    const { artist_packages, fetchPackages } = usePackageStore();

    const [bookedDates, setBookedDates] = useState<string[]>([]);
    const [formData, setFormData] = useState<BookingFormData>({
        package: '',
        event_date: '',
        event_time: '',
        event_loc: '',
        event_type: '',
        attendees: 1,
        budget: 0,
        contract_term: '',
        admin_note: '',
        accepted_by_artist: false,
        accepted_by_user: false,
        user: null,
        artist: artist?._id || null,
        status: "pending"
    });

    const [errors, setErrors] = useState<BookingFormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            const artistData = await fetchArtistByStageName(slug || '');
            setArtist(artistData ?? null);

            await fetchPackages();

            const bookingDate = await fetchArtistBookingDetails(artistData?._id || "");
            setBookedDates(bookingDate || []);
        };
        loadData();
    }, [slug, fetchArtistByStageName, fetchPackages, fetchArtistBookingDetails]);


    useEffect(() => {
        if (!artist) return;

        const filteredPackage = artist_packages.filter(pkg => pkg?.artist?._id === artist._id);

        setArtistPackages(filteredPackage);
    }, [artist_packages, artist]);


    const validateStep = useCallback((stepNum: number) => {
        const newErrors: BookingFormErrors = {};

        if (stepNum === 1) {
            if (!formData.package) newErrors.package = 'Please select a package';
            if (!formData.event_type) newErrors.event_type = 'Please select an event type';
        }

        if (stepNum === 2) {
            if (!formData.event_time) newErrors.event_time = 'Please add event time';
            if (!formData.event_loc) newErrors.event_loc = 'Please select an event location';
            if (!formData.event_loc) newErrors.attendees = 'Please add no of attendance';
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleNext = useCallback(() => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    }, [step, validateStep]);


    const handleSubmit = useCallback(async () => {
        if (!validateStep(3)) return;

        setIsSubmitting(true);

        const fullPackage = artist_packages.find(e => String(e._id) === String(formData.package));

        const fullArtist = artists.find(e => String(e._id) === String(artist?._id));

        try {
            const bookingData: Omit<Booking, "_id"> = {
                artist: fullArtist
                    ? { _id: String(fullArtist._id), stage_name: fullArtist.stage_name }
                    : null,
                user: null,
                package: fullPackage
                    ? { _id: String(fullPackage._id), title: fullPackage.title, capacity: fullPackage.capacity }
                    : null,
                event_loc: formData?.event_loc ?? "",
                event_type: formData?.event_type ?? "",
                event_date: formData.event_date,
                event_time: formData.event_time,
                attendees: formData.attendees,
                budget: formData.budget,
                contract_term: formData.contract_term,
                accepted_by_user: false,
                accepted_by_artist: false,
                admin_note: '',
                payment: null,
                status: "pending",
            };


            addBooking(bookingData);
            await new Promise(resolve => setTimeout(resolve, 1500));
            setStep(4);
        } catch (error) {
            console.error('Booking error:', error);
            alert('Failed to create booking. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    }, [artist, artist_packages, artists, formData, addBooking, validateStep]);



    if (!artist) {
        return (
            <Loader />
        );
    }


    return (
        <div className="min-h-screen">
            <PageMeta title="Artist Booking" />
            <div className="max-w-4xl mx-auto">
                <BookingHeader artist={artist} />
                <BookingStepper step={step} />
                <div className="bg-white rounded-2xl p-8 shadow-sm">
                    {step === 1 && (

                        <BookingPackageEvent
                            artistPackages={artistPackages}
                            eventTypes={EVENT_TYPES || []}
                            formData={formData}
                            setFormData={setFormData}
                            errors={errors}
                            setErrors={setErrors}
                        />

                    )}

                    {step === 2 && (

                        <BookingDateTimeLoc
                            locations={CITIESLIST || []}
                            formData={formData}
                            setFormData={setFormData}
                            errors={errors}
                            setErrors={setErrors}
                            bookedDates={bookedDates}
                            artistPackages={artistPackages}
                        />
                    )}


                    {step === 3 && (

                        <BookingBudget formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />

                    )}


                    {step === 4 && (

                        <BookingSuccess artist={artist} slug={artist?.stage_name} />
                    )}


                    {step < 4 && (
                        <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                            {step > 1 && (
                                <button
                                    onClick={() => setStep(step - 1)}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
                                >
                                    Previous
                                </button>
                            )}
                            <button
                                onClick={step === 3 ? handleSubmit : handleNext}
                                disabled={isSubmitting}
                                className="flex-1 px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Processing...
                                    </>
                                ) : step === 3 ? (
                                    'Submit Booking Request'
                                ) : (
                                    'Next Step'
                                )}
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default ArtistBooking
