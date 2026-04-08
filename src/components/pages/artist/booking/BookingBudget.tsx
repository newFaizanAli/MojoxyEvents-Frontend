import React from "react";
import { BookingFormData, BookingFormErrors } from "../../../../types";
import { SuspenseComp } from "../../../shared";


interface Props {
    formData: BookingFormData;
    setFormData: React.Dispatch<React.SetStateAction<BookingFormData>>;
    errors: BookingFormErrors;
    setErrors: React.Dispatch<React.SetStateAction<BookingFormErrors>>;
}

const BookingBudget = React.memo(({ formData, setFormData, errors, setErrors }: Props) => {
    return (
        <SuspenseComp>
            <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Budget & Contract Terms</h2>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Your Budget (PKR)</label>
                    <input
                        type="number"
                        min="0"
                        value={formData.budget}
                        onChange={(e) => {
                            setFormData(prev => ({ ...prev, budget: parseFloat(e.target.value) || 0 }));
                            setErrors(prev => ({ ...prev, budget: '' }));
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-600 focus:border-transparent"
                        placeholder="Enter your budget"
                    />
                    {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget}</p>}
                </div>


            </div>
        </SuspenseComp>

    )
})

export default BookingBudget
