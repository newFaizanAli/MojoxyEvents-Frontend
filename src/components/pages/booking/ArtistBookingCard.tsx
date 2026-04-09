import { useNavigate } from 'react-router';
import { Calendar, Check, Clock, DollarSign, Eye, MapPin, Users, UserCheck, AlertCircle } from 'lucide-react';
import { Booking } from '../../../types';
import { ROUTES_PATHS } from '../../../routes/route_paths';
import { formatDate, formatTime, getStatusColor } from '../../../utilities/functions';
import { SuspenseComp } from '../../shared';


interface ArtistBookingCardProps {
    booking: Booking;
    canAccept: boolean;
    isAccepting: boolean;
    handleAcceptBooking: (bookingId: string) => Promise<void>;
}

const ArtistBookingCard: React.FC<ArtistBookingCardProps> = ({
    booking,
    canAccept,
    isAccepting,
    handleAcceptBooking
}) => {
    const navigate = useNavigate();

    const handleViewDetails = (bookingId: string): void => {
        navigate(ROUTES_PATHS?.PROTECTED.BOOKING.VIEW(bookingId));
    };

    return (
        <SuspenseComp>
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                <div className="p-5">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-semibold text-slate-900">
                                    {booking?.user?.name || 'N/A'}
                                </h3>
                            </div>
                            <p className="text-sm text-slate-500">{booking?.booking_id}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking?.status)}`}>
                            {booking?.status}
                        </span>
                    </div>

                    {/* Booking Details */}
                    <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span>{formatDate(booking?.event_date)}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span>{formatTime(booking?.event_time)}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <MapPin className="w-4 h-4 text-slate-400" />
                            <span>{booking?.event_loc || 'N/A'}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Users className="w-4 h-4 text-slate-400" />
                            <span>{booking.attendees} attendees</span>
                            {booking.package?.capacity && (
                                <span className="text-xs text-slate-400">
                                    (max: {booking.package.capacity})
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <DollarSign className="w-4 h-4 text-slate-400" />
                            <span className="font-semibold text-slate-700">
                                Rs. {booking.budget.toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Package & Event Type */}
                    <div className="pt-4 border-t border-slate-100 mb-4">
                        <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                            <span className="font-medium">{booking.package?.title || 'No package'}</span>
                            <span>{booking.event_type || 'Event'}</span>
                        </div>

                        {/* Acceptance Status */}
                        <div className="flex items-center gap-3 text-xs">
                            <div className="flex items-center gap-1">
                                {booking.accepted_by_user ? (
                                    <Check className="w-3 h-3 text-green-600" />
                                ) : (
                                    <AlertCircle className="w-3 h-3 text-yellow-600" />
                                )}
                                <span className={booking.accepted_by_user ? 'text-green-600' : 'text-yellow-600'}>
                                    User {booking.accepted_by_user ? 'Accepted' : 'Pending'}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                {booking.accepted_by_artist ? (
                                    <Check className="w-3 h-3 text-green-600" />
                                ) : (
                                    <AlertCircle className="w-3 h-3 text-yellow-600" />
                                )}
                                <span className={booking.accepted_by_artist ? 'text-green-600' : 'text-yellow-600'}>
                                    Artist {booking.accepted_by_artist ? 'Accepted' : 'Pending'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2">
                        <button
                            onClick={() => handleViewDetails(booking?._id || '')}
                            className="w-full flex items-center justify-center gap-2 bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
                        >
                            <Eye className="w-4 h-4" />
                            View Details
                        </button>

                        {canAccept && (
                            <button
                                onClick={() => handleAcceptBooking(booking._id || '')}
                                disabled={isAccepting}
                                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isAccepting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Accepting...
                                    </>
                                ) : (
                                    <>
                                        <UserCheck className="w-4 h-4" />
                                        Accept Booking
                                    </>
                                )}
                            </button>
                        )}

                        {booking.accepted_by_artist && !canAccept && (
                            <div className="text-center text-xs text-green-600 py-2 bg-green-50 rounded-lg font-medium">
                                ✓ You have accepted this booking
                            </div>
                        )}

                        {!canAccept && !booking.accepted_by_artist && booking.status !== 'pending' && (
                            <div className="text-center text-xs text-slate-500 py-2">
                                Booking is {booking.status}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </SuspenseComp>
    );
};

export default ArtistBookingCard;