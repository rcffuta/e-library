/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef } from "react";
import { UploadCloud, FileText, X, Loader2, CheckCircle } from "lucide-react";

import { toast } from "sonner";
import clsx from "clsx";
import { getUploadSignature, saveMaterial } from "@/app/admin/uploads/action";

interface UploadFormProps {
    courses: { id: string; code: string; title: string }[];
}

export function UploadForm({ courses }: UploadFormProps) {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const formRef = useRef<HTMLFormElement>(null);

    // Drag & Drop State
    const [isDragging, setIsDragging] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragging(true);
        } else if (e.type === "dragleave") {
            setIsDragging(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const validateAndSetFile = (selectedFile: File) => {
        if (selectedFile.type !== "application/pdf") {
            toast.error("Only PDF files are allowed");
            return;
        }
        // Max 50MB
        if (selectedFile.size > 50 * 1024 * 1024) {
            toast.error("File size must be less than 50MB");
            return;
        }
        setFile(selectedFile);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData(e.currentTarget);

        try {
            // 1. Get Signature
            const { signature, timestamp } = await getUploadSignature();

            // 2. Upload to Cloudinary
            const cloudinaryData = new FormData();
            cloudinaryData.append("file", file);
            cloudinaryData.append(
                "api_key",
                process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
            ); // Wait, API Key is public-safe, but usually we just use cloud name in URL
            // Actually standard unsigned/signed upload endpoint logic:

            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
            const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`; // Note: Use 'image/upload' for PDFs too, or 'raw/upload' if you don't want preview generation. Cloudinary treats PDFs as images often for previews. 'auto' is safest.
            const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

            cloudinaryData.append("api_key", process.env.CLOUDINARY_API_KEY!); // Wait, do NOT expose API Key if not needed.
            // Correct flow for signed upload:
            cloudinaryData.append(
                "api_key",
                process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ||
                    "REPLACE_WITH_PUBLIC_VAR_IF_NEEDED",
            );
            // Actually, standard signed upload needs: file, timestamp, signature, api_key, folder

            // Let's assume you put CLOUDINARY_API_KEY in NEXT_PUBLIC for this specific component or pass it from server.
            // Better: Pass api_key from the server action to keep it clean.

            // REVISED UPLOAD LOGIC:
            const uploadParams = new FormData();
            uploadParams.append("file", file);
            uploadParams.append("timestamp", timestamp.toString());
            uploadParams.append("signature", signature);
            uploadParams.append("folder", "rcf-elib");
            uploadParams.append(
                "api_key",
                process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
            ); // You need to add this to .env.local

            const uploadRes = await fetch(uploadUrl, {
                method: "POST",
                body: uploadParams,
            });

            const uploadResult = await uploadRes.json();

            if (!uploadRes.ok)
                throw new Error(uploadResult.message || "Upload failed");

            // 3. Save to Supabase
            const result = await saveMaterial({
                courseId: formData.get("courseId") as string,
                title: formData.get("title") as string,
                type: formData.get("type") as any,
                year: formData.get("year") as string,
                semester: formData.get("semester") as any,
                fileUrl: uploadResult.secure_url,
                fileSize: uploadResult.bytes,
            });

            if (result.error) throw new Error(result.error);

            toast.success("Material uploaded successfully!");
            setFile(null);
            formRef.current?.reset();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsUploading(false);
            setProgress(0);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">
                    Upload New Material
                </h2>
                <p className="text-sm text-gray-500">
                    Supported files: PDF (Max 50MB)
                </p>
            </div>

            <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="p-6 space-y-6"
            >
                {/* Course & Metadata Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Select Course
                        </label>
                        <select
                            name="courseId"
                            required
                            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="">-- Choose Course --</option>
                            {courses.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.code} - {c.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            name="title"
                            placeholder="e.g. 2023 Rain Semester Exam"
                            required
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                            Material Type
                        </label>
                        <select
                            name="type"
                            className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="PQ">Past Question</option>
                            <option value="NOTE">Lecture Note</option>
                            <option value="TEXTBOOK">Textbook</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Year
                            </label>
                            <input
                                name="year"
                                placeholder="2024"
                                required
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Semester
                            </label>
                            <select
                                name="semester"
                                className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            >
                                <option value="FIRST">First / Harmattan</option>
                                <option value="SECOND">Second / Rain</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Drop Zone */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        File Attachment
                    </label>

                    {!file ? (
                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            className={clsx(
                                "border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-colors cursor-pointer",
                                isDragging
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50",
                            )}
                        >
                            <input
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                id="file-upload"
                                onChange={(e) =>
                                    e.target.files?.[0] &&
                                    validateAndSetFile(e.target.files[0])
                                }
                            />
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer flex flex-col items-center"
                            >
                                <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                                    <UploadCloud className="h-6 w-6" />
                                </div>
                                <span className="font-semibold text-gray-900">
                                    Click to upload
                                </span>
                                <span className="text-gray-500 mt-1">
                                    or drag and drop PDF here
                                </span>
                            </label>
                        </div>
                    ) : (
                        <div className="border border-blue-200 bg-blue-50 rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 bg-white rounded-lg flex items-center justify-center text-red-500 shadow-sm">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 truncate max-w-[200px]">
                                        {file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {(file.size / 1024 / 1024).toFixed(2)}{" "}
                                        MB
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setFile(null)}
                                className="p-1 hover:bg-red-100 hover:text-red-600 rounded-full text-gray-400 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isUploading || !file}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                    >
                        {isUploading ? (
                            <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                Uploading & Saving...
                            </>
                        ) : (
                            <>
                                <CheckCircle className="h-5 w-5" />
                                Upload Material
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
