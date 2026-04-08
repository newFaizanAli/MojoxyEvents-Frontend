import React from "react"


const ProfileCTA = React.memo(() => {
    return (
        <div className="bg-gradient-to-br from-brand-800 to-brand-600 rounded-2xl p-6 text-white">
            <h3 className="text-lg font-bold mb-2">Ready to Book?</h3>
            <p className="text-sm text-brand-100 mb-4">Get a personalized quote for your event</p>
            <button className="w-full px-6 py-3 bg-white text-brand-600 font-semibold rounded-xl hover:bg-brand-50 transition-colors">
                Request Quote
            </button>
        </div>
    )
})

export default ProfileCTA
