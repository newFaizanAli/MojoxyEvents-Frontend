import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react'


const BackButton = React.memo(() => {
    const navigate = useNavigate();
    return (
        <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
            <ArrowLeft className="w-4 h-4" />
            Go Back
        </button>
    )
})

export default BackButton
