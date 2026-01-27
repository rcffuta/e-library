"use server";
import { ict, ictAdmin } from "@/lib/ict";
import { cookies } from "next/headers";

export async function trackDownload(materialId: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("sb-access-token")?.value;
    if (!token) return null;

    try {
        // 1. Get User
        const {
            data: { user },
        } = await ict.supabase.auth.getUser(token);
        if (!user) return null;

        // 2. Record the Download Log (For History/Analytics)
        await ictAdmin.supabase.from("elib_downloads").insert({
            material_id: materialId,
            user_id: user.id,
        });

        // 3. Increment the Counter on the Material (For fast sorting)
        // We use an RPC (Stored Procedure) or just a raw SQL increment if RPC isn't set up.
        // For simplicity with JS client:

        // Fetch current count
        const { data: mat } = await ictAdmin.supabase
            .from("elib_materials")
            .select("downloads, file_path")
            .eq("id", materialId)
            .single();

        if (mat) {
            await ictAdmin.supabase
                .from("elib_materials")
                .update({ downloads: (mat.downloads || 0) + 1 })
                .eq("id", materialId);

            return mat.file_path; // Return the actual Cloudinary URL to open
        }

        return null;
    } catch (error) {
        console.error("Download Track Error:", error);
        return null;
    }
}
