import React, { lazy } from 'react';
import { Calendar, Clock, MapPin, Users, DollarSign, FileText } from 'lucide-react';
import { Booking } from '../../../../types';
import { formatDate, formatTime } from '../../../../utilities/functions';
import { SuspenseComp } from '../../../shared';
const EventDetailCard = lazy(() => import("./EventDetailCard"))

interface Props {
    booking: Booking
}

const EventDetails = React.memo(({ booking }: Props) => {
    const details = [
        { icon: Calendar, label: 'Event Date', value: formatDate(booking.event_date) },
        { icon: Clock, label: 'Event Time', value: formatTime(booking.event_time) },
        { icon: MapPin, label: 'Location', value: booking.event_loc || 'N/A' },
        { icon: Users, label: 'Attendees', value: `${booking.attendees} people` },
        { icon: DollarSign, label: 'Budget', value: `Rs. ${booking.budget.toLocaleString()}` },
    ];

    return (
        <SuspenseComp>
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-brand-600" />
                    Event Details
                </h2>

                <div className="space-y-3">
                    {details.map((d, idx) => (
                        <EventDetailCard key={idx} icon={d.icon} label={d.label} value={d.value} />
                    ))}
                </div>
            </div>
        </SuspenseComp>
    );
});


export default EventDetails
