import React from 'react';
import { useNavigate } from 'react-router';
import { Calendar, Check, Clock, DollarSign, Edit2, Eye, MapPin, Users, X } from 'lucide-react';
import { Booking } from '../../../types';
import { formatDate, formatTime, getStatusColor } from '../../../utilities/functions';
import { ROUTES_PATHS } from '../../../routes/route_paths';



interface EditFormData {
    event_date: string;
    event_time: string;
    attendees: number;
    budget: number;
}


interface BookingCardProps {
    booking: Booking
    isEditing: boolean;
    editForm: Partial<EditFormData>;
    setEditForm: React.Dispatch<React.SetStateAction<Partial<EditFormData>>>;
    canEdit: boolean;
    handleSaveEdit: (bookingId: string) => Promise<void>;
    handleCancelEdit: () => void;
    handleEdit: (booking: Booking) => void;
}


const SelfBookingCard = React.memo(({ booking, isEditing, editForm, setEditForm, canEdit, handleSaveEdit, handleCancelEdit, handleEdit }: BookingCardProps) => {
    const navigate = useNavigate();

    const handleViewDetails = (bookingId: string): void => {
        navigate(ROUTES_PATHS.PROTECTED.BOOKING.VIEW(bookingId));
    };

    return (
        <div
            key={booking._id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
        >
            <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold text-slate-900">
                                {booking.artist?.stage_name || 'N/A'}
                            </h3>
                        </div>
                        <p className="text-sm text-slate-500">{booking.booking_id}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                        {booking.status}
                    </span>
                </div>

                <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {isEditing ? (
                            <input
                                type="date"
                                value={editForm.event_date}
                                onChange={(e) => setEditForm({ ...editForm, event_date: e.target.value })}
                                className="flex-1 px-2 py-1 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                        ) : (
                            <span>{formatDate(booking.event_date)}</span>
                        )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock className="w-4 h-4 text-slate-400" />
                        {isEditing ? (
                            <input
                                type="time"
                                value={editForm.event_time}
                                onChange={(e) => setEditForm({ ...editForm, event_time: e.target.value })}
                                className="flex-1 px-2 py-1 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-500"
                            />
                        ) : (
                            <span>{formatTime(booking.event_time)}</span>
                        )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span>{booking?.event_loc || 'N/A'}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users className="w-4 h-4 text-slate-400" />
                        {isEditing ? (
                            <input
                                type="number"
                                value={editForm.attendees}
                                onChange={(e) => setEditForm({ ...editForm, attendees: parseInt(e.target.value) })}
                                className="flex-1 px-2 py-1 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-500"
                                min={1}
                            />
                        ) : (
                            <span>{booking.attendees} attendees</span>
                        )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                        <DollarSign className="w-4 h-4 text-slate-400" />
                        {isEditing ? (
                            <input
                                type="number"
                                value={editForm.budget}
                                onChange={(e) => setEditForm({ ...editForm, budget: parseInt(e.target.value) })}
                                className="flex-1 px-2 py-1 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-500"
                                min="0"
                            />
                        ) : (
                            <span>Rs. {booking.budget.toLocaleString()}</span>
                        )}
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                        <span>{booking.package?.title || 'No package'}</span>
                        <span>{booking.event_type || 'Event'}</span>
                    </div>

                    {isEditing ? (
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleSaveEdit(booking._id || '')}
                                    className="flex-1 flex items-center justify-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
                                >
                                    <Check className="w-4 h-4" />
                                    Save
                                </button>
                                <button
                                    onClick={handleCancelEdit}
                                    className="flex-1 flex items-center justify-center gap-2 bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-300 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                    Cancel
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            <button
                                onClick={() => handleViewDetails(booking?._id || '')}
                                className="w-full flex items-center justify-center gap-2 bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
                            >
                                <Eye className="w-4 h-4" />
                                View Details
                            </button>

                            {canEdit && (
                                <button
                                    onClick={() => handleEdit(booking)}
                                    className="w-full flex items-center justify-center gap-2 bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700 transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Edit Booking
                                </button>
                            )}

                            {!canEdit && (
                                <div className="text-center text-xs text-slate-500 py-2">
                                    {booking.accepted_by_artist ? 'Accepted by artist' : 'Cannot edit'}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
})

export default SelfBookingCard
