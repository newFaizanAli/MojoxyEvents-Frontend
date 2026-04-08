import React from "react";
import { CheckCircle } from "lucide-react";
import { SuspenseComp } from "../../../shared";


interface Props {
    step: number;
}

const labels = ['Package & Event', 'Date & Location', 'Budget & Terms', 'Confirm'];

const BookingStepper = React.memo(({ step }: Props) => {
    return (
        <SuspenseComp>
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
                <div className="flex items-center justify-between">
                    {labels?.map((label, idx) => (
                        <div key={idx} className="flex items-center flex-1">
                            <div className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step > idx + 1 ? 'bg-green-500 text-white' :
                                    step === idx + 1 ? 'bg-brand-600 text-white' :
                                        'bg-gray-200 text-gray-500'
                                    }`}>
                                    {step > idx + 1 ? <CheckCircle className="w-5 h-5" /> : idx + 1}
                                </div>
                                <span className="text-xs mt-2 text-gray-600 text-center">{label}</span>
                            </div>
                            {idx < 3 && (
                                <div className={`flex-1 h-1 mx-4 ${step > idx + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </SuspenseComp>
    );
});

export default BookingStepper;
