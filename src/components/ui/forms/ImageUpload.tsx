import { useEffect, useMemo } from "react";
import { Upload, X } from "lucide-react";
import Label from "./Label";
import Button from "./Button";

interface ImageUploadProps {
    title?: string;
    value: File | string | "";
    onChange: (file: File | string) => void;
    error?: string;
    label?: string;
    accept?: string;
    className?: string;
}

const ImageUpload = ({
    title = "Image Link",
    value,
    onChange,
    error,
    label = "Upload Image",
    accept = "image/*",
    className = "",
}: ImageUploadProps) => {

    const preview = useMemo(() => {
        if (value instanceof File) {
            return URL.createObjectURL(value);
        } else if (typeof value === "string" && value !== "") {
            return value;
        } else {
            return null;
        }
    }, [value]);


    useEffect(() => {
        if (value instanceof File) {
            const url = URL.createObjectURL(value);
            return () => URL.revokeObjectURL(url);
        }
    }, [value]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        // Check if filename contains space
        if (/\s/.test(file.name)) {
            alert("File name must not contain spaces. Please rename your file.");

            // Reset input
            e.target.value = "";

            return;
        }

        onChange(file);
    };


    const handleRemove = () => {
        onChange("");
    };

    return (
        <div className={className}>
            {label && (
                <Label>{title}</Label>
            )}

            <div className="space-y-4">
                <div className="relative">
                    <input
                        type="file"
                        accept={accept}
                        className={`h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm
                             shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3
                             ${error ? "border-error-500 focus:border-error-300 focus:ring-error-500/20"
                                : "bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20"
                            }`}
                        onChange={handleFileChange}
                    />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                {preview && (
                    <div className="relative inline-block">
                        <div className="relative group">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full max-w-md h-auto rounded-lg border-2 border-gray-200 shadow-lg"
                                onError={(e) => {
                                    e.currentTarget.src = "";
                                    e.currentTarget.alt = "Failed to load image";
                                }}
                            />
                            <Button
                                type="button"
                                onClick={handleRemove}
                                className="inline-flex items-center justify-center gap-2 rounded-lg transition bg-red-500 text-white shadow-theme-xs hover:bg-red-600 disabled:bg-red-300"
                                size="sm"
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                        <p className="text-sm text-gray-700 mt-2">Image Preview</p>
                    </div>
                )}

                {!preview && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Upload className="w-4 h-4" />
                        <span>Upload an image file (PNG, JPG, JPEG, GIF, WEBP)</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
