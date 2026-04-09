import React from 'react'

const InfoCard = React.memo(({ label, value }: { label: string; value: string }) => (
    <div className="bg-slate-50 rounded-lg p-4">
        <label className="text-xs font-medium text-slate-500 uppercase">{label}</label>
        <p className="text-slate-900 font-medium mt-1">{value}</p>
    </div>
));

export default InfoCard
