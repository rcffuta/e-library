"use server";

import { ictAdmin } from "@/lib/ict";

export async function getAdminStats() {
    try {
        // Run parallel counts for speed
        const [courses, materials, downloads, recentUploads] =
            await Promise.all([
                // 1. Total Courses
                ictAdmin.supabase
                    .from("elib_courses")
                    .select("*", { count: "exact", head: true }),

                // 2. Total Materials
                ictAdmin.supabase
                    .from("elib_materials")
                    .select("*", { count: "exact", head: true }),

                // 3. Total Downloads (Sum of downloads column)
                // Note: Supabase doesn't support .sum() easily via JS client without RPC,
                // so we might just fetching raw materials and reducing,
                // OR better: Create a DB View. For now, we sum logically or just count rows if you have a download log.
                // Let's assume we want just the count of materials for now to keep it fast.
                ictAdmin.supabase
                    .from("elib_downloads")
                    .select("*", { count: "exact", head: true }),

                // 4. Recent 5 Materials
                ictAdmin.supabase
                    .from("elib_materials")
                    .select(
                        `
          id, title, type, created_at, downloads,
          course:elib_courses(code)
        `,
                    )
                    .order("created_at", { ascending: false })
                    .limit(5),
            ]);

        return {
            totalCourses: courses.count || 0,
            totalMaterials: materials.count || 0,
            totalDownloads: downloads.count || 0, // Using the download log count
            recentUploads: recentUploads.data || [],
        };
    } catch (error) {
        console.error("Admin Stats Error:", error);
        return null;
    }
}
