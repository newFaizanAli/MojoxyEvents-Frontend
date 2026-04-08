import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router";
import { Package, ExtraIncludedPackage } from "../../types";
import { useArtistStore, usePackageStore } from "../../store";
import { PackageFormData } from "../../types/package";
import { Button, FormSelect, Input, Label, TextArea } from "../../components/ui/forms";

const PackageForm = () => {
    const location = useLocation();
    const { package_id } = useParams<{ package_id?: string }>();
    const { addPackage, updatePackage, fetchPackageById } = usePackageStore();
    const { artists, fetchArtists, isFetched: isArtistFetched } = useArtistStore();

    const defaultForm: PackageFormData = {
        title: "",
        artist: location.state?.artistId || null,
        description: "",
        price: 0,
        duration_minutes: 0,
        capacity: 0,
        extras: [],
    };

    const [packg, setPackage] = useState<Package | null>(null);
    const [extras, setExtras] = useState<ExtraIncludedPackage[]>([]);
    const [extraInput, setExtraInput] = useState<ExtraIncludedPackage>({ title: "", price: "", description: "" });

    const { register, handleSubmit, control, formState: { errors }, reset } = useForm<PackageFormData>({ defaultValues: defaultForm });

    useEffect(() => { if (!isArtistFetched) fetchArtists(); }, [isArtistFetched, fetchArtists]);


    useEffect(() => {
        const loadPackage = async () => {
            if (!package_id) return resetForm(defaultForm);

            const fetched = await fetchPackageById(package_id);
            if (!fetched) return resetForm(defaultForm);

            setPackage(fetched);
            reset({
                title: fetched.title || "",
                artist: fetched.artist?._id || location.state?.artistId || null,
                description: fetched.description || "",
                price: fetched.price || 0,
                duration_minutes: fetched.duration_minutes || 0,
                capacity: fetched.capacity || 0,
                extras: fetched.extras || [],
            });
            setExtras(fetched.extras || []);
        };

        const resetForm = (values: PackageFormData) => { setPackage(null); setExtras([]); reset(values); };

        loadPackage();
    }, [package_id, fetchPackageById, reset, location.state?.artistId]);

    // Artist select options
    const artistOptions = artists.map(a => ({ value: a._id || "", label: a.stage_name || "Unnamed Artist" }));

    // Extras handlers
    const handleAddExtra = () => {
        if (!extraInput.title || !extraInput.price || !extraInput.description) return;
        setExtras(prev => [...prev, extraInput]);
        setExtraInput({ title: "", price: "", description: "" });
    };
    const handleRemoveExtra = (index: number) => setExtras(prev => prev.filter((_, i) => i !== index));

    // Submit
    const onSubmit = (data: PackageFormData) => {
        const artistObj = artists.find(a => String(a._id) === String(data.artist));
        const payload: Omit<Package, "_id"> = {
            ...data,
            artist: artistObj ? { _id: String(artistObj._id), stage_name: artistObj.stage_name } : null,
            extras,
        };

        if (packg) updatePackage(packg._id!, payload);
        else addPackage(payload);
    };




    return (
        <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800">{packg ? "Edit" : "Add"} Package</h4>
            <p className="mb-6 text-sm text-gray-500">{packg ? "Update package details." : "Fill the form to add a new package."}</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                    <div>
                        <Label>Title</Label>
                        <Input type="text" {...register("title", { required: "Title is required" })} error={!!errors.title} />
                        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                    </div>

                    <div>
                        <Label>Artist</Label>
                        <FormSelect options={artistOptions} placeholder="Select Artist" {...register("artist")} />
                        {errors.artist && <p className="text-red-500">{errors.artist.message}</p>}
                    </div>

                    <div>
                        <Label>Description</Label>
                        <Controller control={control} name="description" render={({ field }) =>
                            <TextArea value={field.value} onChange={field.onChange} placeholder="Description" error={!!errors.description} />
                        } />
                        {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                    </div>

                    <div>
                        <Label>Price</Label>
                        <Input type="number" {...register("price", { required: "Price is required" })} error={!!errors.price} />
                        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                    </div>

                    <div>
                        <Label>Capacity</Label>
                        <Input type="number" {...register("capacity", { required: "Capacity is required" })} error={!!errors.capacity} />
                        {errors.capacity && <p className="text-red-500">{errors.capacity.message}</p>}
                    </div>

                    <div>
                        <Label>Duration Minutes</Label>
                        <Input type="number" {...register("duration_minutes", { required: "Duration minutes is required" })} error={!!errors.duration_minutes} />
                        {errors.duration_minutes && <p className="text-red-500">{errors.duration_minutes.message}</p>}
                    </div>

                    <div className="lg:col-span-2">
                        <Label>Extras</Label>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-3">
                            <Input placeholder="Title" value={extraInput.title} onChange={e => setExtraInput({ ...extraInput, title: e.target.value })} />
                            <Input placeholder="Price" value={extraInput.price} onChange={e => setExtraInput({ ...extraInput, price: e.target.value })} />
                            <Input placeholder="Description" value={extraInput.description} onChange={e => setExtraInput({ ...extraInput, description: e.target.value })} />
                        </div>
                        <Button type="button" size="sm" variant="primary" onClick={handleAddExtra}>Add Extra Package</Button>

                        <div className="space-y-2 mt-2">
                            {extras.map((pkg, idx) => (
                                <div key={idx} className="flex justify-between items-center border px-4 py-2 rounded-full text-sm bg-success-50 text-success-600">
                                    <div><strong>{pkg.title}</strong> — {pkg.price} ({pkg.description})</div>
                                    <button type="button" className="text-red-500 hover:text-red-700" onClick={() => handleRemoveExtra(idx)}>&times;</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                    <Button size="sm" variant="primary" type="submit">{packg ? "Update" : "Save"} Package</Button>
                </div>
            </form>
        </div>
    );
};

export default PackageForm;