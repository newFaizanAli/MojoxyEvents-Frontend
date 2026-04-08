import React, { useMemo, useEffect } from "react";
import { Link } from "react-router";
import { MapPin } from "lucide-react";
import { Artist } from "../../../../types";
import { ROUTES_PATHS } from "../../../../routes/route_paths";

interface Props {
    artist: Artist | null;
}

const ProfileHeroSec = React.memo(({ artist }: Props) => {
    // ✅ Safe image sources
    const bgImage = useMemo(() => {
        if (artist?.story_img_link instanceof File) {
            return URL.createObjectURL(artist.story_img_link);
        }
        return artist?.story_img_link || null;
    }, [artist?.story_img_link]);

    const avatarImage = useMemo(() => {
        if (artist?.img_link instanceof File) {
            return URL.createObjectURL(artist.img_link);
        }
        return artist?.img_link || null;
    }, [artist?.img_link]);

    // ✅ Cleanup object URLs (important)
    useEffect(() => {
        return () => {
            if (bgImage && artist?.story_img_link instanceof File) {
                URL.revokeObjectURL(bgImage);
            }
            if (avatarImage && artist?.img_link instanceof File) {
                URL.revokeObjectURL(avatarImage);
            }
        };
    }, [bgImage, avatarImage, artist]);

    return (
        <div className="relative h-[22rem] sm:h-[26rem] lg:h-[32rem] overflow-hidden rounded-lg">

            {/* Background Image */}
            {bgImage && (
                <img
                    src={bgImage}
                    alt={artist?.stage_name || "artist"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand/80 via-brand/40 to-transparent" />

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 px-3 sm:px-5 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6 lg:gap-8">

                        {/* Avatar */}
                        {avatarImage && (
                            <img
                                src={avatarImage}
                                alt={artist?.stage_name || "artist"}
                                className="
                  w-20 h-20
                  sm:w-24 sm:h-24
                  lg:w-32 lg:h-32
                  rounded-xl sm:rounded-2xl
                  border-2 sm:border-4 border-white
                  shadow-xl object-cover
                "
                                loading="lazy"
                            />
                        )}

                        {/* Info */}
                        <div className="flex-1">
                            {/* Name */}
                            <h1 className="font-bold text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-2">
                                {artist?.stage_name || "Unknown Artist"}
                            </h1>

                            {/* Description */}
                            <p className="text-gray-200 text-sm sm:text-base lg:text-lg mb-2 sm:mb-3 line-clamp-2">
                                {artist?.short_desc || "No description available"}
                            </p>

                            {/* Badges */}
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                {artist?.category?.name && (
                                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm text-white">
                                        {artist.category.name}
                                    </span>
                                )}

                                {artist?.is_travel_flexible && (
                                    <span className="px-3 py-1 bg-brand-500/80 backdrop-blur-sm rounded-full text-xs sm:text-sm text-white flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        Travel Flexible
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* CTA */}
                        {artist?.stage_name && (
                            <Link
                                to={ROUTES_PATHS?.PROTECTED?.ARTIST?.BOOKING?.ADD(
                                    artist.stage_name
                                )}
                                className="
                  w-full sm:w-auto text-center
                  px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3
                  bg-brand-500 text-white font-semibold
                  rounded-lg sm:rounded-xl shadow-lg
                  transition-all duration-300
                  hover:shadow-xl hover:scale-[1.02]
                "
                            >
                                Book Now
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ProfileHeroSec;