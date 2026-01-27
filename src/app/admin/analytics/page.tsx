/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAnalyticsData } from "./action";
import { AnalyticsChart } from "@/components/admin/AnalyticsChart";
import {  Trophy, Users } from "lucide-react";
import { format } from "date-fns";

export default async function AnalyticsPage() {
    const { chartData, topMaterials, recentActivity } =
        await getAnalyticsData();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Analytics & Reports
                </h1>
                <p className="text-gray-500">
                    Track usage and engagement across the library.
                </p>
            </div>

            {/* Main Chart Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Download Trends
                        </h2>
                        <p className="text-sm text-gray-500">
                            Activity over the last 7 days
                        </p>
                    </div>
                    <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                        Real-time
                    </div>
                </div>
                <AnalyticsChart data={chartData} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Top Materials - Left Column */}
                <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <Trophy className="h-5 w-5 text-amber-500" />
                            <h2 className="font-semibold text-gray-900">
                                Top Resources
                            </h2>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {topMaterials.map((item: any, index: number) => (
                            <div
                                key={item.id}
                                className="p-4 flex items-center gap-4 hover:bg-gray-50"
                            >
                                <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-sm">
                                    #{index + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {item.title}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {item.course?.code}
                                    </p>
                                </div>
                                <div className="text-sm font-bold text-gray-900">
                                    {item.downloads}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity - Right Column (Span 2) */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-blue-500" />
                            <h2 className="font-semibold text-gray-900">
                                Recent Downloads
                            </h2>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500">
                                <tr>
                                    <th className="px-6 py-3 font-medium">
                                        Student
                                    </th>
                                    <th className="px-6 py-3 font-medium">
                                        Department
                                    </th>
                                    <th className="px-6 py-3 font-medium">
                                        Material
                                    </th>
                                    <th className="px-6 py-3 font-medium text-right">
                                        Time
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentActivity.map((log: any) => (
                                    <tr
                                        key={log.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">
                                                {log.user
                                                    ? `${log.user.first_name} ${log.user.last_name}`
                                                    : "Unknown User"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {log.user?.department ? (
                                                <span
                                                    className="truncate max-w-[150px] block"
                                                    title={log.user.department}
                                                >
                                                    {log.user.department} (
                                                    {log.user.current_level}L)
                                                </span>
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-gray-400" />
                                                <span
                                                    className="truncate max-w-[200px]"
                                                    title={log.material?.title}
                                                >
                                                    {log.material?.title ||
                                                        "Deleted Material"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right text-gray-500">
                                            {format(
                                                new Date(log.downloaded_at),
                                                "h:mm a",
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                {recentActivity.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-6 py-12 text-center text-gray-500"
                                        >
                                            No downloads recorded yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

function FileText({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
        </svg>
    );
}
