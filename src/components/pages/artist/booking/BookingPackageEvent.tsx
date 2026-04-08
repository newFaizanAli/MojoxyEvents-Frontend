import React from 'react'
import { Package } from '../../../../types';
import { BookingFormData, BookingFormErrors } from '../../../../types';
import { SuspenseComp } from '../../../shared';

interface Props {
    artistPackages: Package[];
    formData: BookingFormData;
    eventTypes: {
        label: string,
        value: string
    }[];
    setFormData: React.Dispatch<React.SetStateAction<BookingFormData>>;
    setErrors: React.Dispatch<React.SetStateAction<BookingFormErrors>>;
    errors: BookingFormErrors;
}

const BookingPackageEvent = React.memo(({ artistPackages, formData, eventTypes, setFormData, setErrors, errors }: Props) => {
    return (
        <SuspenseComp>
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Select Package & Event Type</h2>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Choose a Package</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {artistPackages.map((pkg, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setFormData(prev => ({ ...prev, package: pkg?._id, budget: pkg?.price }));
                                    setErrors(prev => ({ ...prev, package: '' }));
                                }}
                                className={`p-4 border-2 rounded-xl text-left transition-all ${formData?.package === pkg?._id
                                    ? 'border-brand-600 bg-brand-50'
                                    : 'border-gray-200 hover:border-brand-300'
                                    }`}
                            >
                                <h3 className="font-semibold text-gray-900">{pkg?.title}</h3>

                                {pkg?.description && (
                                    <p className="text-sm text-gray-600 mt-1">{pkg?.description}</p>
                                )}

                                <div className="mt-1 text-sm text-gray-500">
                                    <span>Duration: {pkg?.duration_minutes} mins</span>
                                    <span className="mx-2">|</span>
                                    <span>Capacity: {pkg?.capacity}</span>
                                </div>

                                <p className="text-lg font-bold text-brand-600 mt-2">
                                    PKR {pkg?.price?.toLocaleString()}
                                </p>
                            </button>
                        ))}

                    </div>
                    {errors.package && <p className="text-red-500 text-sm mt-1">{errors.package}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Event Type</label>
                    <select
                        value={formData?.event_type || ''}
                        onChange={(e) => {
                            setFormData(prev => ({ ...prev, event_type: e.target.value }));
                            setErrors(prev => ({ ...prev, event_type: '' }));
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                    >
                        <option value="">Select event type</option>
                        {eventTypes?.map((type, idx) => (
                            <option key={idx} value={type.value}>{type.label}</option>
                        ))}
                    </select>
                    {errors.event_type && <p className="text-red-500 text-sm mt-1">{errors.event_type}</p>}
                </div>
            </div>
        </SuspenseComp>
    )
})

export default BookingPackageEvent
