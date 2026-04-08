import React from "react";
import { Languages, MapPin, Users } from "lucide-react";
import { Artist } from "../../../../types";


interface Props {
    artist: Artist | null;
}
const ProfileQuickInfo = React.memo(({ artist }: Props) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Quick Info</h3>

            <div className="space-y-3">
                <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-gray-900">Team Size</p>
                        <p className="text-sm text-gray-600">
                            {artist?.performing_members} performing, {artist?.offstage_members} offstage
                        </p>
                    </div>
                </div>

                {artist?.languages && <div className="flex items-start gap-3">
                    <Languages className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                        <p className="text-sm font-medium text-gray-900">Languages</p>
                        <p className="text-sm text-gray-600">
                            {artist?.languages.map(l => l.name.charAt(0).toUpperCase() + l.name.slice(1)).join(', ')}
                        </p>
                    </div>
                </div>}

                {artist?.perform_locations && (
                    <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">Locations</p>
                            <p className="text-sm text-gray-600">
                                {artist?.perform_locations?.slice(0, 3)
                                    .map((loc) =>
                                        loc
                                    )
                                    .join(", ")}
                                {artist?.perform_locations?.length > 3 &&
                                    ` +${artist?.perform_locations.length - 3} more`}
                            </p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
})

export default ProfileQuickInfo
