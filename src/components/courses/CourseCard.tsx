/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Book, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";

interface CourseCardProps {
    course: any; // Type this properly later
}

export function CourseCard({ course }: CourseCardProps) {
    // Random gradient for visual variety based on level
    const getGradient = (level: number) => {
        if (level >= 500) return "from-purple-500 to-indigo-600";
        if (level >= 300) return "from-blue-500 to-cyan-600";
        return "from-emerald-500 to-teal-600";
    };

    return (
        <Link
            href={`/course/${course.id}`}
            className="group relative bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 block"
        >
            {/* Header with Icon */}
            <div className="flex justify-between items-start mb-4">
                <div
                    className={`h-12 w-12 rounded-lg bg-gradient-to-br ${getGradient(course.level)} flex items-center justify-center shadow-sm`}
                >
                    <Book className="text-white h-6 w-6" />
                </div>
                <span className="px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-600 rounded-md">
                    {course.level}L
                </span>
            </div>

            {/* Content */}
            <div className="space-y-1">
                <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                    {course.code}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-1">
                    {course.title}
                </p>
            </div>

            {/* Footer Stats */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    <span>{course._count?.[0]?.count || 0} Materials</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
            </div>
        </Link>
    );
}
