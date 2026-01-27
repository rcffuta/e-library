import { getInitialDashboardData } from "./action";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { StoreInitializer } from "@/components/providers/StoreInitializer";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    // 1. Fetch on Server
    const data = await getInitialDashboardData();

    // 2. If Auth fails on server, bounce to login
    if (!data) {
        redirect("/login");
    }

    return (
        <main className="min-h-screen bg-gray-50/50">
            {/* 3. Hydrate Zustand (No Flash!) */}
            <StoreInitializer user={data.user} />

            {/* 4. Render UI */}
            <DashboardShell
                // initialProfile={data.user.user.profile}
                initialCourses={data.courses}
            />
        </main>
    );
}
