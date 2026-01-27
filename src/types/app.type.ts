import { FullUserProfile } from "@rcffuta/ict-lib"

export interface AuthUser {
  id: string
  email: string
  role: 'USER' | 'ADMIN'
  user: FullUserProfile // Replace with FullUserProfile when types are ready
}
