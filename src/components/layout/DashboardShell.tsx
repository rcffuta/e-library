/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { CourseCard } from "@/components/courses/CourseCard";
import { Loader2 } from "lucide-react";
import { useAppStore } from "@/store/app.store";

interface DashboardShellProps {
    initialProfile: any;
    initialCourses: any[];
}

export function DashboardShell({
    initialProfile,
    initialCourses,
}: DashboardShellProps) {
    const setUser = useAppStore(e=>e.setUser);
    const searchQuery = useAppStore(e=>e.searchQuery);

    // Hydrate Store on Mount
    useEffect(() => {
        if (initialProfile) {
            setUser(initialProfile);
        }
    }, [initialProfile, setUser]);

    // Client-side filtering logic
    const filteredCourses = initialCourses.filter((course) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            course.code.toLowerCase().includes(searchLower) ||
            course.title.toLowerCase().includes(searchLower)
        );
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Welcome, {initialProfile.firstName} 👋
                </h1>
                <p className="text-gray-500 mt-1">
                    Here are the recommended resources for{" "}
                    <span className="font-medium text-gray-900">
                        {initialProfile.department} ({initialProfile.level}L)
                    </span>
                    .
                </p>
            </div>

            {/* Grid */}
            {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCourses.map((course: any) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                    <div className="mx-auto h-12 w-12 text-gray-400 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Loader2 className="h-6 w-6 animate-spin" />
                        {/* Or use a 'SearchX' icon if not loading */}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                        No courses found
                    </h3>
                    <p className="text-gray-500">
                        Try adjusting your search query.
                    </p>
                </div>
            )}
        </div>
    );
}
