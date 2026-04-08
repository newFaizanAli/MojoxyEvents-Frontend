import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router";
import { CategGenre, Category, CategoryFormData } from "../../types";
import { ARTIST_GENRES } from "../../utilities/constants";
import { useCategoryStore } from "../../store";
import { SuspenseComp } from "../../components/shared";
import { Button, ImageUpload, Input, Label, Select, TextArea } from "../../components/ui/forms";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../components/ui/table/table";


const CategoryForm = () => {
    const { slug } = useParams<{ slug?: string }>();
    const { addCategory, updateCategory, fetchCategoryBySlug } = useCategoryStore();
    const [category, setCategory] = useState<Category | null>(null);
    const [categGenre, setCategGenres] = useState<CategGenre[]>([]);

    const { register, handleSubmit, control, formState: { errors }, setValue, reset } = useForm<CategoryFormData>({
        defaultValues: { name: "", slug: "", description: "", img_link: "" as unknown as File | '', genres: [] },
    });

    // Load category if editing
    useEffect(() => {
        const loadCategory = async () => {
            if (!slug) return resetForm();
            const fetched = await fetchCategoryBySlug(slug);
            if (!fetched) return resetForm();

            setCategory(fetched);
            reset({
                name: fetched.name,
                slug: fetched.slug,
                description: fetched.description,
                img_link: fetched.img_link,
            });

            const mappedGenres = (fetched.genres || []).map(item => {
                const match = ARTIST_GENRES.find(g => g.value === item.genre);
                return { genre: item.genre, name: match?.label || item.genre };
            });
            setCategGenres(mappedGenres);
        };

        const resetForm = () => {
            setCategory(null);
            setCategGenres([]);
            reset({ name: "", slug: "", description: "", img_link: "" as unknown as File | '', genres: [] });
        };

        loadCategory();
    }, [slug, fetchCategoryBySlug, reset]);

    const genreOptions = ARTIST_GENRES.map(g => ({ value: g.value ?? "", label: g.label }));

    const handleAddGenre = (genreId: string) => {
        if (categGenre.some(g => g.genre === genreId)) return;
        const genre = ARTIST_GENRES.find(g => g.value === genreId);
        if (!genre) return;
        setCategGenres([...categGenre, { genre: genre.value!, name: genre.label }]);
    };

    const handleRemoveGenre = (index: number) => setCategGenres(categGenre.filter((_, i) => i !== index));

    const onSubmit = (data: CategoryFormData) => {
        const payload: Omit<Category, "_id"> = { ...data, genres: categGenre };

        if (category) updateCategory(category._id!, payload);
        else addCategory(payload);
    };

    return (
        <SuspenseComp>
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 lg:p-11">
                <h4 className="mb-2 text-2xl font-semibold text-gray-800">{category ? "Edit" : "Add"} Category</h4>
                <p className="mb-6 text-sm text-gray-500">{category ? "Update genre details." : "Fill the form to add a new category."}</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                        <div>
                            <Label>Name</Label>
                            <Input type="text" {...register("name", { required: "Name is required" })} error={!!errors.name} />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        </div>

                        <div>
                            <Label>Slug</Label>
                            <Input type="text" {...register("slug", { required: "Slug is required" })} error={!!errors.slug} />
                            {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}
                        </div>

                        <Controller
                            name="img_link"
                            control={control}
                            render={({ field }) => <ImageUpload title="Image" value={field.value} onChange={file => setValue("img_link", file, { shouldValidate: true })} error={errors.img_link?.message} />}
                        />

                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => <TextArea value={field.value} onChange={field.onChange} placeholder="Enter description" error={!!errors.description} />}
                        />
                    </div>

                    <Label>Genre</Label>
                    <Select options={genreOptions} placeholder="Select Genre" onChange={handleAddGenre} />

                    <Table>
                        <TableHeader className="border-b border-gray-100">
                            <TableRow>
                                <TableCell isHeader>Name</TableCell>
                                <TableCell isHeader>Action</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-100 text-center">
                            {categGenre.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        <Button variant="danger" size="sm" type="button" onClick={() => handleRemoveGenre(index)}>Remove</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                        <Button size="sm" variant="primary" type="submit">{category ? "Update" : "Save"} Category</Button>
                    </div>
                </form>
            </div>
        </SuspenseComp>
    );
};

export default CategoryForm;