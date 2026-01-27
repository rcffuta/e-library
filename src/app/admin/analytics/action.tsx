"use server";

import { ictAdmin } from "@/lib/ict";
import { format, subDays } from "date-fns";


export async function getAnalyticsData() {
    try {
        // 1. Top 5 Most Downloaded Materials
        const { data: topMaterials } = await ictAdmin.supabase
            .from("elib_materials")
            .select("id, title, downloads, course:elib_courses(code)")
            .order("downloads", { ascending: false })
            .limit(5);

        // 2. Recent Download Activity (Last 20)
        // We need to fetch the User profile data too.
        // Since 'profiles' is in public, we can join it if foreign keys are set correctly.
        const { data: recentActivity } = await ictAdmin.supabase
            .from("elib_downloads")
            .select(
                `
        id, 
        downloaded_at,
        material:elib_materials(title, type),
        user:profiles(first_name, last_name, department, current_level)
      `,
            )
            .order("downloaded_at", { ascending: false })
            .limit(20);

        // 3. Downloads Last 7 Days (For Chart)
        // Since doing complex aggregation in Supabase JS client is hard,
        // we fetch the last 7 days of raw logs and group them in JS (fine for <10k records daily)
        const sevenDaysAgo = subDays(new Date(), 7).toISOString();

        const { data: lastWeekLogs } = await ictAdmin.supabase
            .from("elib_downloads")
            .select("downloaded_at")
            .gte("downloaded_at", sevenDaysAgo);

        // Group by Date
        const chartDataMap: Record<string, number> = {};

        // Initialize last 7 days with 0
        for (let i = 6; i >= 0; i--) {
            const date = format(subDays(new Date(), i), "MMM dd");
            chartDataMap[date] = 0;
        }

        // Fill counts
        lastWeekLogs?.forEach((log) => {
            const date = format(new Date(log.downloaded_at), "MMM dd");
            if (chartDataMap[date] !== undefined) {
                chartDataMap[date]++;
            }
        });

        const chartData = Object.entries(chartDataMap).map(([date, count]) => ({
            date,
            downloads: count,
        }));

        return {
            topMaterials: topMaterials || [],
            recentActivity: recentActivity || [],
            chartData,
        };
    } catch (error) {
        console.error("Analytics Error:", error);
        return { topMaterials: [], recentActivity: [], chartData: [] };
    }
}
