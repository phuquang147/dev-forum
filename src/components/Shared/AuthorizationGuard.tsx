import { useSession } from 'next-auth/react'
import { type FC, type ReactNode } from 'react'
import Loading from '../UI/Loading'
import Permission from './Permission'

interface AuthorizationGuardProps {
  children: ReactNode
}

const AuthorizationGuard: FC<AuthorizationGuardProps> = ({ children }) => {
  const session = useSession()

  if (session.status === 'loading') return <Loading />

  return session.data?.user.user.role === 'Admin' ? children : <Permission />
}

export default AuthorizationGuard
