"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    BookOpen,
    UploadCloud,
    Users,
    Settings,
    Library,
    LogOut,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import clsx from "clsx";

const navigation = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Courses", href: "/admin/courses", icon: BookOpen },
    { name: "Upload Materials", href: "/admin/uploads", icon: UploadCloud },
    { name: "Downloads & Analytics", href: "/admin/analytics", icon: Users },
    // { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const logout = useAuthStore((s) => s.logout);

    return (
        <div className="flex h-full w-64 flex-col bg-slate-900 text-white">
            {/* Brand */}
            <div className="flex h-16 items-center gap-2 px-6 font-bold text-xl border-b border-slate-800">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Library className="h-5 w-5 text-white" />
                </div>
                <span>Admin Panel</span>
            </div>

            {/* Nav */}
            <nav className="flex-1 space-y-1 px-3 py-6">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={clsx(
                                isActive
                                    ? "bg-blue-600 text-white"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-white",
                                "group flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                            )}
                        >
                            <item.icon
                                className={clsx(
                                    isActive
                                        ? "text-white"
                                        : "text-slate-400 group-hover:text-white",
                                    "mr-3 h-5 w-5 flex-shrink-0",
                                )}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="border-t border-slate-800 p-4">
                <button
                    onClick={() => logout()} // You might want to wire this to a server action too
                    className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                    <LogOut className="mr-3 h-5 w-5 text-slate-400 group-hover:text-white" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
