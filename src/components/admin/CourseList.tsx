/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { deleteCourse } from "@/app/admin/courses/action";
import { Trash2, FileText, Search } from "lucide-react";
import { useState } from "react";

import { toast } from "sonner";


export function CourseList({ courses }: { courses: any[] }) {
    // const router = useRouter();
    // const [isPending, startTransition] = useTransition();
    const [search, setSearch] = useState("");

    // Simple client-side search for speed on small lists
    const filteredCourses = courses.filter(
        (c) =>
            c.code.toLowerCase().includes(search.toLowerCase()) ||
            c.title.toLowerCase().includes(search.toLowerCase()),
    );

    const handleDelete = async (id: string) => {
        if (
            !confirm(
                "Are you sure? This will delete all materials inside this course.",
            )
        )
            return;

        const res = await deleteCourse(id);
        if (res.success) {
            toast.success("Course deleted");
        } else {
            toast.error(res.error);
        }
    };

    return (
        <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                    placeholder="Search courses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
            </div>

            <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-500 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 font-medium">Code</th>
                            <th className="px-6 py-3 font-medium">Title</th>
                            <th className="px-6 py-3 font-medium">
                                Department
                            </th>
                            <th className="px-6 py-3 font-medium">Level</th>
                            <th className="px-6 py-3 font-medium text-center">
                                Materials
                            </th>
                            <th className="px-6 py-3 font-medium text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredCourses.map((course) => (
                            <tr
                                key={course.id}
                                className="hover:bg-gray-50/50 group transition-colors"
                            >
                                <td className="px-6 py-4 font-bold text-gray-900">
                                    {course.code}
                                </td>
                                <td className="px-6 py-4 text-gray-600">
                                    {course.title}
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {course.department}
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs font-medium text-gray-700">
                                        {course.level}L
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                                        <FileText className="h-3 w-3" />
                                        {course._count?.[0]?.count || 0}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleDelete(course.id)}
                                        className="text-gray-400 hover:text-red-600 transition-colors p-1"
                                        title="Delete Course"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredCourses.length === 0 && (
                            <tr>
                                <td
                                    colSpan={6}
                                    className="px-6 py-12 text-center text-gray-500"
                                >
                                    No courses found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
