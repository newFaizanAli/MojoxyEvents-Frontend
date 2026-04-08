import React, { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Package, BookingFormData, BookingFormErrors } from '../../../../types';
import { SuspenseComp } from '../../../shared';


interface Props {
    bookedDates: string[]
    formData: BookingFormData;
    setFormData: React.Dispatch<React.SetStateAction<BookingFormData>>;
    locations: {
        label: string,
        value: string
    }[]
    artistPackages: Package[]
    errors: BookingFormErrors;
    setErrors: React.Dispatch<React.SetStateAction<BookingFormErrors>>;
}
const BookingDateTimeLoc = React.memo(({ bookedDates, formData, setFormData, locations, artistPackages, errors, setErrors }: Props) => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const daysList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const getDaysInMonth = (date: Date): { daysInMonth: number; startingDayOfWeek: number } => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        return { daysInMonth, startingDayOfWeek };
    };

    const isDateBooked = (dateStr: string) => {
        return bookedDates.includes(dateStr);
    };

    const isDatePast = (dateStr: string) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const checkDate = new Date(dateStr);
        return checkDate < today;
    };

    const formatDateForInput = (year: number, month: number, day: number) => {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    };

    const handleDateSelect = (dateStr: string) => {
        if (isDateBooked(dateStr) || isDatePast(dateStr)) return;

        setSelectedDate(dateStr);
        setFormData(prev => ({ ...prev, event_date: dateStr }));
        setErrors(prev => ({ ...prev, event_date: '' }));
    };

    const renderCalendar = () => {
        const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const days = [];

        // Empty cells before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="aspect-square" />);
        }


        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = formatDateForInput(year, month, day);
            const isBooked = isDateBooked(dateStr);
            const isPast = isDatePast(dateStr);
            const isSelected = selectedDate === dateStr;
            const isDisabled = isBooked || isPast;

            days.push(
                <button
                    key={day}
                    onClick={() => handleDateSelect(dateStr)}
                    disabled={isDisabled}
                    className={`
            aspect-square rounded-lg text-sm font-medium transition-all
            ${isSelected ? 'bg-brand-600 text-white ring-2 ring-brand-600 ring-offset-2' : ''}
            ${!isSelected && !isDisabled ? 'hover:bg-brand-50 text-gray-700' : ''}
            ${isDisabled ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}
            ${isBooked && !isPast ? 'bg-red-50 text-red-400' : ''}
            ${isPast ? 'bg-gray-50' : ''}
          `}
                >
                    {day}
                </button>
            );
        }

        return days;
    };

    return (
        <SuspenseComp>
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Select Date, Time & Location</h2>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Event Date</label>
                    <div className="border border-gray-200 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h3 className="font-semibold">
                                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </h3>
                            <button
                                onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="grid grid-cols-7 gap-2 mb-2">
                            {daysList?.map(day => (
                                <div key={day} className="text-center text-sm font-medium text-gray-500">
                                    {day}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                            {renderCalendar()}
                        </div>
                        <div className="flex items-center gap-4 mt-4 text-xs text-gray-600">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-brand-600 rounded"></div>
                                <span>Selected</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-red-50 border border-red-200 rounded"></div>
                                <span>Booked</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gray-50 rounded"></div>
                                <span>Past</span>
                            </div>
                        </div>
                    </div>
                    {errors.event_date && <p className="text-red-500 text-sm mt-1">{errors.event_date}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Event Time</label>
                    <input
                        type="time"
                        value={formData.event_time}
                        onChange={(e) => {
                            setFormData(prev => ({ ...prev, event_time: e.target.value }));
                            setErrors(prev => ({ ...prev, event_time: '' }));
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                    />
                    {errors.event_time && <p className="text-red-500 text-sm mt-1">{errors.event_time}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Event Location</label>
                    <select
                        value={formData?.event_loc || ''}
                        onChange={(e) => {
                            setFormData(prev => ({ ...prev, event_loc: e.target.value }));
                            setErrors(prev => ({ ...prev, event_loc: '' }));
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                    >
                        <option value="">Select location</option>
                        {locations?.map((loc, idx) => (
                            <option key={idx} value={loc.value}>{loc.label}</option>
                        ))}
                    </select>
                    {errors.event_loc && <p className="text-red-500 text-sm mt-1">{errors.event_loc}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Expected Attendees</label>
                    <input
                        type="number"
                        min="1"
                        value={formData.attendees}
                        onChange={(e) => {
                            const attendees = parseInt(e.target.value) || 1;
                            setFormData(prev => ({ ...prev, attendees }));


                            const selectedPackage = artistPackages.find(pkg => pkg._id === formData.package);
                            if (selectedPackage && attendees > selectedPackage.capacity) {
                                setErrors(prev => ({ ...prev, attendees: `Cannot exceed package capacity (${selectedPackage.capacity})` }));
                            } else {
                                setErrors(prev => ({ ...prev, attendees: '' }));
                            }
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                    />
                    {errors.attendees && <p className="text-red-500 text-sm mt-1">{errors.attendees}</p>}
                </div>
            </div>
        </SuspenseComp>
    )
}
)
export default BookingDateTimeLoc
