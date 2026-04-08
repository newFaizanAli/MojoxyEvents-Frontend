import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Artist } from '../../types';
import { useArtistStore } from '../../store';
import PageMeta from '../../components/shared/PageMeta';
import SuspenseComp from '../../components/shared/SuspenseComp';
import { ArtistProfileCTA, ArtistProfileEventType, ArtistProfileGenre, ArtistProfileHeroSec, ArtistProfileMainContent, ArtistProfileQuickInfo } from '../../components/pages/artist/profile';



const ArtistProfile = React.memo(() => {
    const { slug } = useParams();

    const [artist, setArtist] = useState<Artist | null>(null);
    const { fetchArtistByStageName } = useArtistStore();

    useEffect(() => {
        fetchArtistByStageName(slug || '').then(artist => setArtist(artist));
    }, [fetchArtistByStageName, slug]);



    return (
        <div className="min-h-screen ">
            <PageMeta title='Artist Profile' />

            {/* Hero Section */}
            <SuspenseComp>
                <ArtistProfileHeroSec artist={artist || null} />

                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <ArtistProfileMainContent artist={artist} />

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Info */}

                            <ArtistProfileQuickInfo artist={artist} />

                            {/* Genres */}
                            {artist?.genres && (
                                <ArtistProfileGenre artist={artist} />
                            )}


                            {/* Event Types */}
                            {artist?.event_types && <ArtistProfileEventType artist={artist} />}

                            {/* CTA */}
                            <ArtistProfileCTA />
                        </div>
                    </div>
                </div>
            </SuspenseComp>
        </div>
    );
});

export default ArtistProfile;