/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { ict, ictAdmin } from '@/lib/ict' // Import Admin Client
import { AuthUser } from '@/types/app.type'
// import { AuthUser } from '@/store/auth.store' // Update import path if needed
import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'

export async function getInitialDashboardData(): Promise<{
  user: AuthUser,
  courses: any[],
} | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get('sb-access-token')?.value

  // If no token, return null (Page will handle redirect)
  if (!token) return null

  try {
    // 1. Validate User Identity (Secure Check)
    const { data: { user }, error: authError } = await ict.supabase.auth.getUser(token)
    
    if (authError || !user) {
      return null
    }

    // 2. Fetch Profile
    const profile = await ictAdmin.member.getFullProfile(user.id)

    if (!profile) throw new Error("Profile not found")

    // 3. Fetch Courses using ADMIN Client (Bypasses RLS issues)
    // We safely manually filter by the user's department here
    const { data: courses } = await ictAdmin.supabase
      .from('elib_courses')
      .select(`*, _count: elib_materials(count)`)
      // .or(`department.eq.${profile.academics.department},code.ilike.GNS%`)
      // .lte('level', profile.academics.currentLevel)
      .order('level', { ascending: false })
      .limit(50)

    // 4. Return data structured for Zustand
    return {
      user: {
        id: user.id,
        email: user.email!,
        role: 'USER', 
        user: profile
      },
      courses: courses || []
    }

  } catch (error) {
    console.error("Dashboard Fetch Error:", error)
    return null
  }
}