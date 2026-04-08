import { useState } from "react";
import { ArtistAchievement, ArtistGallery, ArtistLanguage } from "../../types";
import { ARTIST_GENRES, CITIESLIST, EVENT_TYPES } from "../../utilities/constants";
import { Input, Label } from "../ui/forms";
import { useTagList } from "../../hooks";


type TagSelectorProps = {
    genres: string[]; onGenresChange: (v: string[]) => void;
    eventTypes: string[]; onEventTypesChange: (v: string[]) => void;
    locations: string[]; onLocationsChange: (v: string[]) => void;
};

type GallerySectionProps = { gallery: ArtistGallery[]; onChange: (v: ArtistGallery[]) => void };

type LanguageInputProps = { languages: ArtistLanguage[]; onChange: (v: ArtistLanguage[]) => void };


type AchievementInputProps = { achievements: ArtistAchievement[]; onChange: (v: ArtistAchievement[]) => void };


export const TagChip = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
    <span className="flex items-center gap-2 rounded-full px-2.5 py-0.5 bg-brand-50 text-brand-500">
        {label}
        <button type="button" onClick={onRemove} className="hover:text-red-500">&times;</button>
    </span>
);



export const AddTagRow = ({
    options, value, onChange, onAdd, placeholder = "Select…"
}: { options: { value: string; label: string }[]; value: string; onChange: (v: string) => void; onAdd: () => void; placeholder?: string }) => (
    <div className="flex items-center gap-2">
        <select className="border rounded px-2 py-1 flex-1" value={value} onChange={e => onChange(e.target.value)}>
            <option value="">{placeholder}</option>
            {options.map((o, i) => <option key={i} value={o.value}>{o.label}</option>)}
        </select>
        <button type="button" onClick={onAdd}
            className="rounded-lg px-4 py-2 text-sm bg-brand-500 text-white hover:bg-brand-600">
            Add
        </button>
    </div>
);


export const TagSelector = ({ genres, onGenresChange, eventTypes, onEventTypesChange, locations, onLocationsChange }: TagSelectorProps) => {
    const g = useTagList(genres, onGenresChange);
    const e = useTagList(eventTypes, onEventTypesChange);
    const l = useTagList(locations, onLocationsChange);

    return (
        <>
            {[
                { label: "Genres", opts: ARTIST_GENRES, list: genres, ctrl: g },
                { label: "Event Types", opts: EVENT_TYPES, list: eventTypes, ctrl: e },
                { label: "Locations", opts: CITIESLIST, list: locations, ctrl: l },
            ].map(({ label, opts, list, ctrl }) => (
                <div key={label} className="lg:col-span-2">
                    <Label>{label}</Label>
                    <AddTagRow options={opts as { value: string; label: string }[]} value={ctrl.selected} onChange={ctrl.setSelected} onAdd={ctrl.add} />
                    <div className="mt-3 flex flex-wrap gap-2">
                        {list.map((v, i) => <TagChip key={i} label={v} onRemove={() => ctrl.remove(i)} />)}
                    </div>
                </div>
            ))}
        </>
    );
};



export const LanguageInput = ({ languages, onChange }: LanguageInputProps) => {
    const [input, setInput] = useState("");

    const add = (e: React.MouseEvent) => {
        e.preventDefault();
        const trimmed = input.trim();
        if (!trimmed || languages.some(l => l.name.toLowerCase() === trimmed.toLowerCase())) return;
        onChange([...languages, { name: trimmed }]);
        setInput("");
    };

    return (
        <div className="lg:col-span-2">
            <Label>Languages</Label>
            <div className="flex items-center gap-2">
                <Input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Enter language" />
                <button onClick={add} className="rounded-lg px-4 py-2 text-sm bg-brand-500 text-white hover:bg-brand-600">Add</button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
                {languages.map((lang, i) => (
                    <TagChip key={i} label={lang.name} onRemove={() => onChange(languages.filter((_, idx) => idx !== i))} />
                ))}
            </div>
        </div>
    );
};


const EMPTY: ArtistAchievement = { name: "", for: "", year: "" };


export const AchievementInput = ({ achievements, onChange }: AchievementInputProps) => {
    const [input, setInput] = useState<ArtistAchievement>(EMPTY);

    const add = () => {
        if (!input.name || !input.for || !input.year) return;
        onChange([...achievements, input]);
        setInput(EMPTY);
    };

    return (
        <div className="lg:col-span-2">
            <Label>Achievements</Label>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-3">
                {(["name", "for", "year"] as const).map(field => (
                    <Input key={field} type="text" placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        value={input[field]} onChange={e => setInput(prev => ({ ...prev, [field]: e.target.value }))} />
                ))}
            </div>
            <button type="button" onClick={add}
                className="mb-4 rounded-lg bg-brand-500 px-4 py-2 text-sm text-white hover:bg-brand-600">
                Add Achievement
            </button>
            <div className="space-y-2">
                {achievements.map((ach, i) => (
                    <div key={i} className="flex justify-between items-center border px-4 py-2 rounded-full text-sm bg-success-50 text-success-600">
                        <span><strong>{ach.name}</strong> — {ach.for} ({ach.year})</span>
                        <button type="button" onClick={() => onChange(achievements.filter((_, idx) => idx !== i))}
                            className="text-red-500 hover:text-red-700">&times;</button>
                    </div>
                ))}
            </div>
        </div>
    );
};


const toEmbedURL = (url: string) => {
    try {
        const u = new URL(url);
        if (u.hostname.includes("youtu.be")) return `https://www.youtube.com/embed/${u.pathname.slice(1)}`;
        if (u.hostname.includes("youtube.com")) {
            const id = u.searchParams.get("v");
            return id ? `https://www.youtube.com/embed/${id}` : url;
        }
    } catch { /* noop */ }
    return url;
};



export const GallerySection = ({ gallery, onChange }: GallerySectionProps) => {
    const [type, setType] = useState<"photo" | "video">("photo");
    const [link, setLink] = useState("");

    const add = () => {
        if (!link.trim()) return;
        let normalized = link.trim();
        if (!/^data:|^https?:\/\//.test(normalized)) normalized = `data:image/jpeg;base64,${normalized}`;
        onChange([...gallery, { type, link: normalized }]);
        setLink("");
    };

    return (
        <div className="lg:col-span-2">
            <Label>Gallery</Label>
            <div className="flex items-center gap-2">
                <select className="border rounded px-2 py-1" value={type} onChange={e => setType(e.target.value as "photo" | "video")}>
                    <option value="photo">Photo</option>
                    <option value="video">Video</option>
                </select>
                <input type="text" placeholder="Enter link" className="border rounded px-2 py-1 flex-1"
                    value={link} onChange={e => setLink(e.target.value)} />
                <button type="button" onClick={add}
                    className="rounded bg-brand-500 px-3 py-1 text-white hover:bg-brand-600">Add</button>
            </div>

            <div className="mt-3 flex flex-wrap gap-4">
                {gallery.map((item, i) => (
                    <div key={i} className="relative w-32 border rounded overflow-hidden shadow-sm">
                        {item.type === "photo"
                            ? <img src={item.link} alt={`gallery-${i}`} className="h-24 w-full object-cover"
                                onError={e => (e.currentTarget.src = "/fallback.jpg")} loading="lazy" />
                            : <iframe className="h-24 w-full" src={toEmbedURL(item.link)} title={`video-${i}`}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                        }
                        <button onClick={() => onChange(gallery.filter((_, idx) => idx !== i))}
                            className="absolute top-1 right-1 bg-white rounded-full p-1 text-red-500 shadow-md">&times;</button>
                    </div>
                ))}
            </div>
        </div>
    );
};