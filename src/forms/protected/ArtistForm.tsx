import { Controller } from "react-hook-form";
import { useArtistForm } from "../../hooks";
import { Button, FormSelect, ImageUpload, Input, Label, Switch, Radio } from "../../components/ui/forms";
import { AchievementInput, GallerySection, LanguageInput, TagSelector } from "../../components/forms";
import { SuspenseComp } from "../../components/shared";

const ArtistForm = () => {
    const {
        artist, form, users, categories, onSubmit,
        artistLanguage, setArtistLanguage,
        artistGenres, setArtistGenres,
        event_types, setEventTypes,
        performLocations, setPerformLocations,
        achievements, setAchievements,
        artistGallery, setArtistGallery,
    } = useArtistForm();

    const { register, handleSubmit, control, watch, setValue, formState: { errors } } = form;

    const userOptions = users.map(u => ({ value: u._id || "", label: u.name || "Unnamed" }));
    const categoryOptions = categories.map(c => ({ value: c._id || "", label: c.name || "Unnamed" }));

    return (
        <SuspenseComp>
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800">
                        {artist ? "Edit" : "Add"} Artist Information
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 lg:mb-7">
                        {artist ? "Update artist details." : "Fill the form to add a new artist."}
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <h5 className="mb-5 text-lg font-medium text-gray-800">Artist Information</h5>
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">

                        {/* Stage name */}
                        <div>
                            <Label>Stage Name</Label>
                            <Input type="text" {...register("stage_name", { required: "Stage name is required" })} error={!!errors.stage_name} />
                            {errors.stage_name && <p className="text-red-500">{errors.stage_name.message}</p>}
                        </div>

                        {/* User */}
                        <div>
                            <Label>User</Label>
                            <FormSelect options={userOptions} placeholder="Select User" {...register("user")} />
                        </div>

                        {/* Images */}
                        {(["img_link", "story_img_link"] as const).map(name => (
                            <Controller key={name} name={name} control={control} render={() => (
                                <ImageUpload
                                    title={name === "img_link" ? "Image Link" : "Story Image Link"}
                                    value={watch(name)}
                                    onChange={file => setValue(name, file, { shouldValidate: true, shouldDirty: true })}
                                    error={errors[name]?.message}
                                    label="Upload Image"
                                />
                            )} />
                        ))}

                        {/* Category */}
                        <div>
                            <Label>Category</Label>
                            <FormSelect options={categoryOptions} placeholder="Select Category" {...register("category")} />
                        </div>

                        {/* Member counts */}
                        {(["performing_members", "offstage_members"] as const).map(field => (
                            <div key={field}>
                                <Label>{field === "performing_members" ? "Performing Members" : "Offstage Members"}</Label>
                                <Input type="number" {...register(field)} />
                            </div>
                        ))}

                        {/* Short desc + bio */}
                        {(["short_desc", "bio"] as const).map(field => (
                            <div key={field}>
                                <Label>{field === "short_desc" ? "Short Description" : "Your Story / Bio"}</Label>
                                <Controller control={control} name={field} render={({ field: f }) => (
                                    <textarea className="w-full border rounded px-3 py-2 text-sm"
                                        value={f.value} onChange={f.onChange}
                                        placeholder={field === "short_desc" ? "Short description" : "Story / Bio"} />
                                )} />
                            </div>
                        ))}

                        {/* Tags: genres, events, locations */}
                        <TagSelector
                            genres={artistGenres} onGenresChange={setArtistGenres}
                            eventTypes={event_types} onEventTypesChange={setEventTypes}
                            locations={performLocations} onLocationsChange={setPerformLocations}
                        />

                        {/* Travel */}
                        <div>
                            <Label>Can travel anywhere?</Label>
                            <div className="flex gap-5 px-2">
                                <Switch
                                    label={watch("is_travel_flexible") ? "Yes" : "No"}
                                    defaultChecked={watch("is_travel_flexible")}
                                    onChange={v => setValue("is_travel_flexible", v)}
                                />
                            </div>
                        </div>

                        {/* Languages */}
                        <LanguageInput languages={artistLanguage} onChange={setArtistLanguage} />

                        {/* Gender */}
                        <div>
                            <Label>Type</Label>
                            <div className="flex gap-2">
                                {["male", "female", "other"].map(g => (
                                    <Radio key={g} id={`gender-${g}`} name="gender" value={g}
                                        label={g.charAt(0).toUpperCase() + g.slice(1)}
                                        inputRef={register("gender").ref}
                                        onInputChange={register("gender").onChange}
                                        checked={watch("gender") === g} />
                                ))}
                            </div>
                        </div>

                        {/* Achievements */}
                        <AchievementInput achievements={achievements} onChange={setAchievements} />

                        {/* Gallery */}
                        <GallerySection gallery={artistGallery} onChange={setArtistGallery} />
                    </div>

                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button size="sm" variant="primary" type="submit">
                            {artist ? "Update" : "Save"} Artist
                        </Button>
                    </div>
                </form>
            </div>
        </SuspenseComp>
    );
};

export default ArtistForm;