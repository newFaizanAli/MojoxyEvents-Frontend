import React from "react";
import { Calendar } from "lucide-react";
import { Artist } from "../../../../types";

interface Props {
    artist: Artist | null;
}

const ProfileEventType = React.memo(({ artist }: Props) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-600" />
                Event Types
            </h3>
            <div className="space-y-2">
                {artist?.event_types.map((event, idx) => {

                    return (
                        <div
                            key={idx}
                            className="flex items-center gap-2 text-sm text-gray-700"
                        >
                            <div className="w-1.5 h-1.5 bg-brand-600 rounded-full" />
                            {event}
                        </div>
                    );
                })}
            </div>
        </div>
    )
})

export default ProfileEventType
