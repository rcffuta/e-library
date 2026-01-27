"use client";

import { useAppStore } from "@/store/app.store";
import { useAuthStore } from "@/store/auth.store";
import { Search, Bell, LogOut } from "lucide-react";

export function Navbar() {
    const searchQuery = useAppStore(e => e.searchQuery);
    const setSearchQuery = useAppStore(e => e.setSearchQuery);
    const userFullName = useAuthStore(e => e.user?.user.profile.firstName);
    const userDepartment = useAuthStore(e => e.user?.user.academics.department);
    const userLevel = useAuthStore(e => e.user?.user.academics.currentLevel);
    // const signOut = useAuthStore(e => e.signOut);
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
                            {userFullName || 'User'}
                        </span>
                        <span className="text-xs text-gray-500">
                            {userDepartment || 'Department'} • {userLevel || 'XLevel'}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-rcf-gold flex items-center justify-center text-rcf-navy font-bold border border-rcf-gold">
                            {(userFullName || 'U').charAt(0).toUpperCase()}
                        </div>
                        
                        <button
                            // onClick={}
                            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                            title="Sign Out"
                        >
                            <LogOut className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
