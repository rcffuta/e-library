"use client";

import { useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";

import { toast } from "sonner";
import { createCourse } from "@/app/admin/courses/action";
import { DepartmentUtils } from "@rcffuta/ict-lib";

export function AddCourseModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setIsLoading(true);
        const result = await createCourse(null, formData);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Course created successfully");
            setIsOpen(false);
        }
        setIsLoading(false);
    }

    const DEPARTMENTS = DepartmentUtils.getSelectOptions();
    const CLASS_SETS = [100, 200, 300, 400, 500];

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
                <Plus className="h-4 w-4" />
                Add Course
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Add New Course
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Form */}
                        <form action={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Course Code
                                    </label>
                                    <input
                                        name="code"
                                        placeholder="e.g. CSC 201"
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Level
                                    </label>
                                    <select
                                        name="level"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                    >
                                        {CLASS_SETS.map((level) => (
                                            <option key={level} value={level}>
                                                {level}L
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Course Title
                                </label>
                                <input
                                    name="title"
                                    placeholder="e.g. Introduction to Computing"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Department
                                </label>
                                <select
                                    name="department"
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                                >
                                    <option value="">Select Department</option>
                                    {DEPARTMENTS.map((dept) => (
                                        <option
                                            key={dept.value}
                                            value={dept.value}
                                        >
                                            {dept.label} ({dept.facultyName})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-70"
                                >
                                    {isLoading && (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    )}
                                    Create Course
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
