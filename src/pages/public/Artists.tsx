import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { useArtistStore, useCategoryStore } from "../../store";
import { PageMeta } from "../../components/shared";
import { ArtistCard } from "../../components/pages/artist";
import { Button, FormSelect, Input } from "../../components/ui/forms";

const Artists = () => {
    const location = useLocation();
    const locCategory = location?.state?.category as string | undefined;

    const {
        artists,
        fetchArtists,
        isFetched: isArtistFetched,
    } = useArtistStore();

    const { categories, fetchCategories, isFetched: isCategoryFetched } = useCategoryStore();

    const [searchName, setSearchName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(locCategory ?? "");

    useEffect(() => {
        if (!isArtistFetched) fetchArtists();
        if (!isCategoryFetched) fetchCategories();
    }, [fetchArtists, isArtistFetched, fetchCategories, isCategoryFetched]);

    // Pre-populate category from navigation state
    useEffect(() => {
        if (locCategory) setSelectedCategory(locCategory);
    }, [locCategory]);

    const categoryOptions = useMemo(() => [
        ...categories
            .filter((cat) => cat._id)
            .map((cat) => ({ value: cat._id as string, label: cat.name })),
    ], [categories]);

    const filteredArtists = useMemo(() => {
        return artists.filter((artist) => {
            const matchesName =
                searchName.trim() === "" ||
                artist.stage_name.toLowerCase().includes(searchName.toLowerCase());

            const matchesCategory =
                selectedCategory === "" ||
                artist.category?._id === selectedCategory;

            return matchesName && matchesCategory;
        });
    }, [artists, searchName, selectedCategory]);

    const hasActiveFilters = searchName.trim() !== "" || selectedCategory !== "";

    const clearFilters = () => {
        setSearchName("");
        setSelectedCategory("");
    };

    return (
        <div className="relative min-h-screen flex justify-center flex-wrap">
            <PageMeta title="Artists" />
            <div className="text-center max-w-4xl w-full px-4">

                {/* Search & Filter Controls */}
                <div className="flex flex-col sm:flex-row gap-3 pt-10 pb-4">
                    <div className="flex-1">
                        <Input
                            placeholder="Search by artist name..."
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </div>
                    <div className="w-full sm:w-56">
                        <FormSelect
                            options={categoryOptions}
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        />
                    </div>
                    {hasActiveFilters && (
                        <Button variant="outline" size="sm" onClick={clearFilters}>
                            Clear
                        </Button>
                    )}
                </div>

                {/* Active Filter Chips */}
                {hasActiveFilters && (
                    <div className="flex flex-wrap gap-2 pb-2 justify-start">
                        {searchName.trim() && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-brand-50 text-brand-700 border border-brand-200">
                                Name: "{searchName}"
                                <button onClick={() => setSearchName("")} className="hover:text-brand-900">✕</button>
                            </span>
                        )}
                        {selectedCategory && (
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-brand-50 text-brand-700 border border-brand-200">
                                {categoryOptions.find(c => c.value === selectedCategory)?.label}
                                <button onClick={() => setSelectedCategory("")} className="hover:text-brand-900">✕</button>
                            </span>
                        )}
                    </div>
                )}

                {/* Results Count */}
                {hasActiveFilters && (
                    <p className="text-sm text-gray-500 text-left pb-2">
                        {filteredArtists.length} artist{filteredArtists.length !== 1 ? "s" : ""} found
                    </p>
                )}

                {/* Artist Grid */}
                <div className="w-full flex flex-wrap justify-center gap-6 py-6">
                    {filteredArtists.length > 0 ? (
                        filteredArtists.map((artist, idx) => (
                            <ArtistCard
                                key={idx}
                                name={artist.stage_name}
                                languages={artist.languages}
                                desc={artist.short_desc}
                                imgLink={artist.img_link as string}
                                stage_name={artist.stage_name}
                            />
                        ))
                    ) : (
                        <div className="py-20 text-gray-400">
                            <p className="text-lg font-medium">No artists found</p>
                            <p className="text-sm mt-1">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Artists;