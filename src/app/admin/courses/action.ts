/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { ictAdmin } from '@/lib/ict'
import { revalidatePath } from 'next/cache'

// Fetch Courses with optional search
export async function getCourses(query?: string) {
  let dbQuery = ictAdmin.supabase
    .from('elib_courses')
    .select(`
      *,
      _count: elib_materials(count)
    `)
    .order('created_at', { ascending: false })

  if (query) {
    dbQuery = dbQuery.or(`code.ilike.%${query}%,title.ilike.%${query}%`)
  }

  const { data, error } = await dbQuery
  
  if (error) {
    console.error('Error fetching courses:', error)
    return []
  }
  
  return data
}

// Create a new Course
export async function createCourse(prevState: any, formData: FormData) {
  const code = formData.get('code') as string
  const title = formData.get('title') as string
  const department = formData.get('department') as string
  const level = formData.get('level') as string

  if (!code || !title || !department || !level) {
    return { error: 'All fields are required' }
  }

  try {
    const { error } = await ictAdmin.supabase
      .from('elib_courses')
      .insert({
        code: code.toUpperCase(), // Ensure uppercase (CSC 201)
        title,
        department,
        level: parseInt(level)
      })

    if (error) throw error

    revalidatePath('/admin/courses')
    return { success: true }
  } catch (error: any) {
    return { error: error.message || 'Failed to create course' }
  }
}

// Delete a Course
export async function deleteCourse(courseId: string) {
  try {
    const { error } = await ictAdmin.supabase
      .from('elib_courses')
      .delete()
      .eq('id', courseId)

    if (error) throw error

    revalidatePath('/admin/courses')
    return { success: true }
  } catch (error: any) {
    return { error: error.message }
  }
}