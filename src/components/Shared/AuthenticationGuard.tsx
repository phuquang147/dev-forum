import { useSession } from 'next-auth/react'
import { type FC, type ReactNode } from 'react'
import Loading from '../UI/Loading'
import Permission from './Permission'

interface AuthenticationGuardProps {
  children: ReactNode
}

const AuthenticationGuard: FC<AuthenticationGuardProps> = ({ children }) => {
  const session = useSession()

  if (session.status === 'loading') return <Loading />

  return session.status === 'authenticated' ? children : <Permission />
}

export default AuthenticationGuard
