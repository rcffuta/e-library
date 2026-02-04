/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MaterialCard } from "@/components/courses/MaterialCard";
import { BookAlertIcon } from "lucide-react";
import { useAppStore } from "@/store/app.store";
import { useAuthStore } from "@/store/auth.store";
import { DepartmentUtils } from "@rcffuta/ict-lib";

interface DashboardShellProps {
    initialCourses: any[];
}

export function DashboardShell({ initialCourses }: DashboardShellProps) {
    // We use the global search state
    const searchQuery = useAppStore((s) => s.searchQuery);

    // We get user info from the store (which was just initialized!)
    const user = useAuthStore(e=>e.user?.user);

    // Fallback if something really weird happens
    if (!user) return null;

    const filteredCourses = initialCourses.filter((course) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            course.code.toLowerCase().includes(searchLower) ||
            course.title.toLowerCase().includes(searchLower)
        );
    });

    const department = DepartmentUtils.getByAlias(user.academics.department);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Welcome, {user.profile.firstName} 👋
                </h1>
                <p className="text-gray-500 mt-1">
                    Showing resources for{" "}
                    <span className="font-medium text-gray-900">
                        {department?.name || user.academics.department} (
                        {user.academics.currentLevel})
                    </span>
                </p>
            </div>

            {/* Grid */}
            {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {filteredCourses.map((course) => (
                        <MaterialCard key={course.id} material={course} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                    <div className="h-12 w-12 text-gray-400 bg-gray-50 rounded-xl flex items-center justify-center mb-4">
                        <BookAlertIcon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">
                        No courses found
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                        {searchQuery
                            ? `No results for "${searchQuery}"`
                            : "No courses available for your level yet."}
                    </p>
                </div>
            )}
        </div>
    );
}
