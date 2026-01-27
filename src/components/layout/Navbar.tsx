"use client";

import { useAppStore } from "@/store/app.store";
import { Search, Bell } from "lucide-react";


export function Navbar() {
    const user = useAppStore(e=>e.user);
    const searchQuery = useAppStore(e=>e.searchQuery);
    const setSearchQuery = useAppStore(e=>e.setSearchQuery);
    // const router = useRouter();

    return (
        <header className="sticky top-0 z-30 w-full border-b bg-white/80 backdrop-blur-md px-4 py-3 sm:px-6">
            <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto">
                {/* Logo / Brand */}
                <div className="flex items-center gap-2 font-bold text-lg text-slate-900">
                    <span className="bg-blue-600 text-white p-1 rounded-md text-sm">
                        EL
                    </span>
                    <span className="hidden sm:inline">E-Library</span>
                </div>

                {/* Search Bar (Connected to Zustand) */}
                <div className="flex-1 max-w-md relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search courses (e.g., CSC 301)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                </div>

                {/* User Actions */}
                <div className="flex items-center gap-3">
                    <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
                    </button>

                    <div className="hidden md:flex flex-col items-end text-right">
                        <span className="text-sm font-medium text-gray-900">
                            {user?.firstName}
                        </span>
                        <span className="text-xs text-gray-500">
                            {user?.department} • {user?.level}L
                        </span>
                    </div>

                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border border-blue-200">
                        {user?.firstName.charAt(0)}
                    </div>
                </div>
            </div>
        </header>
    );
}
