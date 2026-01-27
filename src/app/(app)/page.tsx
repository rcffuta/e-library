
import { DashboardShell } from "@/components/layout/DashboardShell";
import { redirect } from "next/navigation";
import { getDashboardData } from "./action";

export default async function DashboardPage() {
    const data = await getDashboardData();

    if (!data) {
        // Session likely expired or invalid, middleware usually catches this
        // but safe to fallback
        redirect("/login");
    }

    return (
        <main className="min-h-screen bg-gray-50/50">
            <DashboardShell
                initialProfile={data.profile}
                initialCourses={data.courses}
            />
        </main>
    );
}
