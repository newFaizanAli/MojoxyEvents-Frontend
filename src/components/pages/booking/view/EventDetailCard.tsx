
interface DetailCardProps { icon: React.FC<any>; label: string; value: string | number }
const EventDetailCard = ({ icon: Icon, label, value }: DetailCardProps) => (
    <div className="bg-slate-50 rounded-lg p-4">
        <label className="text-xs font-medium text-slate-500 uppercase flex items-center gap-2 mb-2">
            <Icon className="w-4 h-4" />
            {label}
        </label>
        <p className="text-slate-900 font-medium">{value}</p>
    </div>
);

export default EventDetailCard