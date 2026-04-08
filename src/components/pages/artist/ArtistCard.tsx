import React from 'react';
import { Link } from 'react-router';
import { ROUTES_PATHS } from '../../../routes/route_paths';
import { SuspenseComp } from '../../shared';


type Props = {
  name: string;
  stage_name: string;
  desc: string;
  imgLink: string;
  languages: {
    name: string;
  }[];
};


const ArtistCard = React.memo(({
  name,
  stage_name,
  desc,
  imgLink,
  languages,
}: Props) => {


  return (
    <SuspenseComp>
      <div className="w-72 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden">
          <img
            alt={name}
            src={imgLink || "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-3">
          {/* Name */}
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
            {name}
          </h3>

          {/* Description */}
          {desc && <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">
            {desc}
          </p>}

          {/* Languages */}
          {(languages && languages.length > 0) && <div className="flex items-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"

            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
              />
            </svg>
            <span className="text-sm text-gray-500 line-clamp-2">
              {languages?.map((e) => e.name.charAt(0).toUpperCase() + e.name.slice(1)).join(", ")}
            </span>
          </div>}

          {/* CTA Button */}
          <Link to={ROUTES_PATHS?.PUBLIC?.ARTIST_SLUG(stage_name || '')} className="w-full mt-4 bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn">
            See Profile
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </SuspenseComp>

  );
});


export default ArtistCard;