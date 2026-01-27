/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { RcfIctClient } from '@rcffuta/ict-lib/server'
import { cookies } from 'next/headers'

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  
  // 1. Initialize Client
  const rcf = RcfIctClient.fromEnv()

  try {
    // 2. Auth with Lib
    const { user, session } = await rcf.auth.login(email, password)

    if (!user || !session) {
      return { success: false, error: "Invalid credentials" }
    }

    // 3. Set Cookies (The Source of Truth for the Server)
    const cookieStore = await cookies()
    
    // Check if we are in dev or prod
    const isProduction = process.env.NODE_ENV === 'production'

    const cookieOptions = {
      path: "/", // CRITICAL: Ensures cookie is available on all pages
      httpOnly: true, // Security: JS cannot read this
      secure: isProduction, // False on localhost
      sameSite: "lax" as const,
      maxAge: 60 * 60 * 24 * 7, // 1 week
    }

    cookieStore.set("sb-access-token", session.access_token, cookieOptions)
    
    if (session.refresh_token) {
      cookieStore.set("sb-refresh-token", session.refresh_token, cookieOptions)
    }

    // 4. Get Role/Profile
    const profile = await rcf.member.getFullProfile(user.id)
    
    // Determine Role (Add your specific logic here)
    // For now assuming all are USER unless specific check
    const role = 'USER' 

    return { success: true, role, profile }

  } catch (error: any) {
    console.error("Login Action Error:", error)
    return { success: false, error: error.message || "Login failed" }
  }
}