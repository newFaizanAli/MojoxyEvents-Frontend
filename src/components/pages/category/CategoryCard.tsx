import React from 'react';
import { useNavigate } from 'react-router';
import { ROUTES_PATHS } from '../../../routes/route_paths';
import { SuspenseComp } from '../../shared';

type CategoryProps = {
    name: string;
    imgLink: string;
    categId?: string;
};

const CategoryCard: React.FC<CategoryProps> = React.memo(({ name, imgLink, categId }) => {
    const navigate = useNavigate();

    return (
        <SuspenseComp>
            <div
                className="w-[220px] h-[220px] rounded-2xl cursor-pointer overflow-hidden 
                 shadow-md group relative border border-gray-300"
                onClick={() => navigate(ROUTES_PATHS?.PUBLIC.ARTISTS, {
                    state: {
                        category: categId
                    }
                })} // `/category/${slug}`
            >
                {/* Image */}
                <img
                    src={imgLink}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                />

                {/* Bottom Overlay */}
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent px-3 py-2">
                    <p className="text-white text-sm font-semibold truncate">
                        {name}
                    </p>
                </div>
            </div>
        </SuspenseComp>
    );
});

export default CategoryCard;
