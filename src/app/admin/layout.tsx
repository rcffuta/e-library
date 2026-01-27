import { AdminSidebar } from "@/components/admin/Sidebar";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Simple Server-Side Protection
    const cookieStore = await cookies();
    const token = cookieStore.get("sb-access-token");

    if (!token) {
        redirect("/login");
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            {/* Fixed Sidebar */}
            <aside className="hidden md:flex md:flex-col">
                <AdminSidebar />
            </aside>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <main className="flex-1 p-6 md:p-8">{children}</main>
            </div>
        </div>
    );
}
