/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAdminStats } from "./action";
import {
    Book,
    FileText,
    Download,
    TrendingUp,
} from "lucide-react";
import { format } from "date-fns";

export default async function AdminDashboard() {
    const stats = await getAdminStats();

    if (!stats) return <div>Error loading stats</div>;

    const cards = [
        {
            name: "Total Courses",
            value: stats.totalCourses,
            icon: Book,
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            name: "Resource Materials",
            value: stats.totalMaterials,
            icon: FileText,
            color: "text-purple-600",
            bg: "bg-purple-50",
        },
        {
            name: "Total Downloads",
            value: stats.totalDownloads,
            icon: Download,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
        },
        // Mocking active users for now
        {
            name: "Active Users",
            value: "120+",
            icon: TrendingUp,
            color: "text-orange-600",
            bg: "bg-orange-50",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Dashboard Overview
                </h1>
                <p className="text-gray-500">Welcome back, Administrator.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map((card) => (
                    <div
                        key={card.name}
                        className="relative overflow-hidden rounded-xl bg-white p-6 shadow-sm border border-gray-100"
                    >
                        <dt>
                            <div
                                className={`absolute rounded-md p-3 ${card.bg}`}
                            >
                                <card.icon
                                    className={`h-6 w-6 ${card.color}`}
                                    aria-hidden="true"
                                />
                            </div>
                            <p className="ml-16 truncate text-sm font-medium text-gray-500">
                                {card.name}
                            </p>
                        </dt>
                        <dd className="ml-16 flex items-baseline pb-1 sm:pb-2">
                            <p className="text-2xl font-semibold text-gray-900">
                                {card.value}
                            </p>
                        </dd>
                    </div>
                ))}
            </div>

            {/* Recent Uploads Table */}
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h2 className="font-semibold text-gray-900">
                        Recent Uploads
                    </h2>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                        View all
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="px-6 py-3 font-medium">
                                    Material Title
                                </th>
                                <th className="px-6 py-3 font-medium">
                                    Course
                                </th>
                                <th className="px-6 py-3 font-medium">Type</th>
                                <th className="px-6 py-3 font-medium">Date</th>
                                <th className="px-6 py-3 font-medium text-right">
                                    Downloads
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {stats.recentUploads.map((file: any) => (
                                <tr
                                    key={file.id}
                                    className="hover:bg-gray-50/50"
                                >
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {file.title}
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                                            {file.course?.code}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                file.type === "PQ"
                                                    ? "bg-amber-100 text-amber-800"
                                                    : file.type === "NOTE"
                                                      ? "bg-blue-100 text-blue-800"
                                                      : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {file.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {format(
                                            new Date(file.created_at),
                                            "MMM d, yyyy",
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right text-gray-500">
                                        {file.downloads}
                                    </td>
                                </tr>
                            ))}
                            {stats.recentUploads.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-6 py-8 text-center text-gray-500"
                                    >
                                        No materials uploaded yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
