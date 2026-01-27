/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { RcfIctClient } from '@rcffuta/ict-lib/server'
import { cookies } from 'next/headers'

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const rcf = RcfIctClient.fromEnv();

  try {
    // 1. Attempt Login via Library
    const { user, session } = await rcf.auth.login(email, password);

    if (!user || !session) {
      return { success: false, error: "Invalid credentials" };
    }

    // 2. CRITICAL: Bridge Session to Next.js Cookies
    const cookieStore = await cookies();
    
    // Helper options for cookies
    const cookieOptions = {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const, // Important for modern browser security
      maxAge: 60 * 60 * 24 * 7, // 1 week
    };

    cookieStore.set("sb-access-token", session.access_token, cookieOptions);

    if (session.refresh_token) {
      cookieStore.set("sb-refresh-token", session.refresh_token, cookieOptions);
    }

    // 3. Fetch Full Profile to determine Role
    // We need to know if they are a student or an admin
    const role = 'USER'; // Default
    
    try {
      const fullProfile = await rcf.member.getFullProfile(user.id);
      
      // Check if they have an admin role in the active tenure
      // (Assuming your lib has a way to check roles, or we check the profile structure)
      // For now, let's assume we pass the profile back and decide on client
      if (fullProfile) {
        // Logic to determine if admin (customize based on your Lib's role structure)
        // Example: if (fullProfile.roles.includes('LIBRARIAN')) role = 'ADMIN'
      }
      
      return { success: true, role, profile: fullProfile };

    } catch (profileError) {
      console.error("Profile fetch error:", profileError);
      // Allow login but maybe redirect to a "Complete Profile" page?
      return { success: true, role: 'USER', warning: "Profile incomplete" };
    }

  } catch (error: any) {
    console.error("Login Error:", error);
    return { success: false, error: error.message || "Login failed" };
  }
}