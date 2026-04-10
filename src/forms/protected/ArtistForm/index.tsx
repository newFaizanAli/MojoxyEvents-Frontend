import { useState } from "react";
import { Controller } from "react-hook-form";
import { useArtistForm } from "../../../hooks";
import { Button, FormSelect, ImageUpload, Input, Label, Switch, Radio } from "../../../components/ui/forms";
import { AchievementInput, GallerySection, LanguageInput, TagSelector } from "../../../components/forms";
import { SuspenseComp } from "../../../components/shared";

const ArtistForm = ({ stage_name }: { stage_name: string }) => {

    const [activeTab, setActiveTab] = useState("basic");



    const {
        artist, form, users, categories, onSubmit,
        artistLanguage, setArtistLanguage,
        artistGenres, setArtistGenres,
        event_types, setEventTypes,
        performLocations, setPerformLocations,
        achievements, setAchievements,
        artistGallery, setArtistGallery,
        isArtistRole
    } = useArtistForm(stage_name);



    const { register, handleSubmit, control, watch, setValue, formState: { errors } } = form;

    const userOptions = users.map(u => ({ value: u._id || "", label: u.name || "Unnamed" }));
    const categoryOptions = categories.map(c => ({ value: c._id || "", label: c.name || "Unnamed" }));

    const formTabs = [
        { key: "basic", label: "Basic Info" },
        { key: "details", label: "Details" },
        { key: "media", label: "Media" },
        { key: "extra", label: "Extra" },
    ]

    return (
        <SuspenseComp>
            <div className="no-scrollbar relative w-full  overflow-y-auto rounded-3xl bg-white p-4 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800">
                        {artist ? "Edit" : "Add"} Artist Information
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 lg:mb-7">
                        {artist ? "Update artist details." : "Fill the form to add a new artist."}
                    </p>
                </div>

                <div className="flex gap-2 mb-6 border-b pb-2">
                    {formTabs.map(tab => (
                        <Button variant={activeTab === tab.key ? "primary" : "outline"} type="button" key={tab.key} onClick={() => setActiveTab(tab.key)}>{tab.label}</Button>
                    ))}
                </div>

                <h5 className="mb-5 text-lg font-medium text-gray-800">Artist Information</h5>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {activeTab === "basic" && (
                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <Label>Stage Name</Label>
                                <Input {...register("stage_name", { required: "Required" })} />
                                {errors.stage_name && <p className="text-red-500">{errors.stage_name.message}</p>}
                            </div>

                            {!isArtistRole && <div>
                                <Label>User</Label>
                                <FormSelect options={userOptions} {...register("user")} />
                            </div>
                            }
                            <div>
                                <Label>Category</Label>
                                <FormSelect options={categoryOptions} {...register("category")} />
                            </div>

                            <div>
                                <Label>Performing Members</Label>
                                <Input type="number" {...register("performing_members")} />
                            </div>

                            <div>
                                <Label>Offstage Members</Label>
                                <Input type="number" {...register("offstage_members")} />
                            </div>
                        </div>
                    )}

                    {activeTab === "details" && (
                        <div className="space-y-5">

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

                            {/* Tags */}
                            <TagSelector
                                genres={artistGenres} onGenresChange={setArtistGenres}
                                eventTypes={event_types} onEventTypesChange={setEventTypes}
                                locations={performLocations} onLocationsChange={setPerformLocations}
                            />

                            {/* Travel */}
                            <div>
                                <Label>Can travel?</Label>
                                <Switch
                                    label={watch("is_travel_flexible") ? "Yes" : "No"}
                                    defaultChecked={watch("is_travel_flexible")}
                                    onChange={v => setValue("is_travel_flexible", v)}
                                />
                            </div>

                            {/* Languages */}
                            <LanguageInput languages={artistLanguage} onChange={setArtistLanguage} />

                        </div>
                    )}

                    {activeTab === "media" && (
                        <>
                            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
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
                            </div>
                            <GallerySection gallery={artistGallery} onChange={setArtistGallery} />
                        </>
                    )}

                    {activeTab === "extra" && (
                        <div className="space-y-5">

                            <Controller
                                name="short_desc"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Label>Short Description</Label>
                                        <textarea {...field} className="w-full border p-2" />
                                    </>
                                )}
                            />

                            <Controller
                                name="bio"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <Label>Bio</Label>
                                        <textarea {...field} className="w-full border p-2" />
                                    </>
                                )}
                            />

                            <AchievementInput
                                achievements={achievements}
                                onChange={setAchievements}
                            />



                        </div>
                    )}

                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        {(!isArtistRole || artist) && (
                            <Button size="sm" variant="primary" type="submit">
                                {artist ? "Update" : "Save"} Artist
                            </Button>
                        )}
                        {isArtistRole && !artist && (
                            <p className="text-sm text-gray-400">Loading your artist profile...</p>
                        )}
                    </div>
                </form>
            </div>
        </SuspenseComp>
    );
};

export default ArtistForm;