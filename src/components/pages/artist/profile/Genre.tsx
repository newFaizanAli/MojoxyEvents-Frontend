import React from "react";
import { Artist } from "../../../../types";


interface Props {
    artist: Artist | null;
}


const ProfileGenre = React.memo(({ artist }: Props) => {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Genres</h3>
            <div className="flex flex-wrap gap-2">
                {artist?.genres?.map((genre, idx) => (
                    <span
                        key={idx}
                        className="px-3 py-1.5 bg-brand-100 text-brand-700 rounded-lg text-sm font-medium"
                    >
                        {genre}
                    </span>
                ))}
            </div>
        </div>
    )
})

export default ProfileGenre
