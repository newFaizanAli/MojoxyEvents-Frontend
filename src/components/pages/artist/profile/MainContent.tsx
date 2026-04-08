import React, { useState } from "react";
import { Award, Play } from "lucide-react";
import { Artist } from "../../../../types";

interface Props {
    artist: Artist | null;
}

const ProfileMainCont = React.memo(({ artist }: Props) => {
    const [selectedMedia, setSelectedMedia] = useState(0);

    return (
        <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed">{artist?.bio}</p>
            </div>

            {/* Gallery */}
            {artist?.gallery && <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Gallery</h2>
                <div className="space-y-4">
                    {/* Main Image */}
                    <div className="relative h-96 rounded-xl overflow-hidden group">
                        <img
                            src={artist?.gallery[selectedMedia]?.link}
                            alt="Gallery"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                        {artist?.gallery[selectedMedia]?.type === 'video' && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                                    <Play className="w-8 h-8 text-brand-600 ml-1" />
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Thumbnails */}
                    <div className="grid grid-cols-6 gap-2">
                        {artist?.gallery.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedMedia(idx)}
                                className={`relative h-20 rounded-lg overflow-hidden transition-all ${selectedMedia === idx ? 'ring-2 ring-brand-600' : 'opacity-70 hover:opacity-100'
                                    }`}
                            >
                                <img src={item.link} alt="" className="w-full h-full object-cover" loading="lazy" />
                                {item.type === 'video' && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                        <Play className="w-4 h-4 text-white" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>}

            {/* Achievements */}
            {artist?.achievements && <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-brand-600" />
                    Achievements
                </h2>
                <div className="space-y-3">
                    {artist?.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 bg-gradient-to-r from-brand-50 to-purple-50 rounded-xl">
                            <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <Award className="w-6 h-6 text-brand-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                                <p className="text-sm text-gray-600">{achievement.for}</p>
                            </div>
                            <span className="text-sm font-medium text-brand-600">{achievement.year}</span>
                        </div>
                    ))}
                </div>
            </div>}
        </div>
    )
})

export default ProfileMainCont
