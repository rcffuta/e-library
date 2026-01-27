/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { v2 as cloudinary } from 'cloudinary'
import { ict, ictAdmin } from '@/lib/ict'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// 1. Generate Secure Signature
export async function getUploadSignature() {
  // Check auth
  const cookieStore = await cookies()
  const token = cookieStore.get('sb-access-token')
  if (!token) throw new Error("Unauthorized")

  const timestamp = Math.round(new Date().getTime() / 1000)

  // We want to organize files in a folder 'rcf-elib'
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: 'rcf-elib',
    },
    process.env.CLOUDINARY_API_SECRET!
  )

  return { timestamp, signature }
}

// 2. Save Metadata to DB
export async function saveMaterial(data: {
  courseId: string
  title: string
  type: 'PQ' | 'NOTE' | 'TEXTBOOK'
  year: string
  semester: 'FIRST' | 'SECOND'
  fileUrl: string
  fileSize: number
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get('sb-access-token')?.value
  if (!token) return { error: "Unauthorized" }

  try {
    // Get uploader ID
    const { data: { user } } = await ict.supabase.auth.getUser(token)

    const { error } = await ictAdmin.supabase
      .from('elib_materials')
      .insert({
        course_id: data.courseId,
        title: data.title,
        type: data.type,
        year: data.year,
        semester: data.semester,
        file_path: data.fileUrl, // Storing full Cloudinary URL
        file_size: data.fileSize,
        uploaded_by: user?.id
      })

    if (error) throw error

    revalidatePath('/admin/uploads')
    revalidatePath('/admin/dashboard')
    
    return { success: true }
  } catch (error: any) {
    console.error("Save Error:", error)
    return { error: error.message || "Failed to save material" }
  }
}

// 3. Helper to fetch courses for the dropdown
export async function getCoursesForSelect() {
  const { data } = await ictAdmin.supabase
    .from('elib_courses')
    .select('id, code, title')
    .order('code', { ascending: true })
  
  return data || []
}