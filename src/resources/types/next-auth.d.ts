import 'next-auth'
import type { TUserRole } from './common.type'

declare module 'next-auth' {
  interface Session {
    user: {
      access_token: string
      user: {
        _id: string
        displayName: string
        avatar: string
        role: TUserRole
      }
    }
  }
}
