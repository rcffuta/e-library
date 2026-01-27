'use server'

import { ict } from '@/lib/ict'
import { cookies } from 'next/headers'

export async function getDashboardData() {
  const cookieStore = await cookies()
  const token = cookieStore.get('sb-access-token')?.value

  if (!token) return null

  try {
    // 1. Get User ID from Token (Decode or usage via ICT lib)
    const { data: { user: authUser } } = await ict.supabase.auth.getUser(token)
    if (!authUser) return null

    // 2. Get Full Profile via ICT Lib
    const user = await ict.member.getFullProfile(authUser.id)

    // 3. Get Relevant Courses
    // Logic: Fetch courses for THEIR department matching their level or below
    // Also include General Studies (GNS) if applicable
    const { data: courses, error } = await ict.supabase
      .from('elib_courses')
      .select(`
        *,
        _count: elib_materials(count)
      `)
      .or(`department.eq.${user?.academics.department},code.ilike.GNS%`) // Get Dept courses OR GNS courses
      .lte('level', user?.academics.currentLevel) // Level <= User Level
      .order('level', { ascending: false }) // Higher levels first
      .limit(20)

    if (error) throw error

    return {
      profile: {
        id: user?.profile.id,
        firstName: user?.profile.firstName,
        department: user?.academics.department,
        level: user?.academics.currentLevel
      },
      courses: courses || []
    }

  } catch (error) {
    console.error("Dashboard Fetch Error:", error)
    return null
  }
}