import React from "react";
import { Artist } from "../../../../types";
import { BackButton } from "../../../shared";


interface Props {
  artist: Artist;
}

const BookingHeader = React.memo(({ artist }: Props) => {

  return (
    <div className="mb-8">
      <BackButton />
      <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
        <img
          src={
            artist.img_link instanceof File
              ? URL.createObjectURL(artist.img_link)
              : artist.img_link || ""
          }
          alt={artist?.stage_name || "N/A"}
          className="w-16 h-16 rounded-xl object-cover"
          loading="lazy"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Book {artist?.stage_name || "N/A"}</h1>
          <p className="text-gray-600">{artist?.short_desc || "N/A"}</p>
        </div>
      </div>
    </div>
  );
});

export default BookingHeader;
