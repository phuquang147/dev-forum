import { type FC, type ReactNode } from 'react'
import AuthenticationGuard from '~/components/Shared/AuthenticationGuard'
import Footer from '../Shared/Footer'
import Header from '../Shared/Header'
import UserSidebar from './UserSidebar'

interface UserLayoutProps {
  children: ReactNode
}

const UserLayout: FC<UserLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <AuthenticationGuard>
        <div className="flex flex-1 gap-4">
          <div className="relative">
            <UserSidebar />
          </div>
          <div className="h-[calc(100vh - 116px)] flex-1">{children}</div>
        </div>
      </AuthenticationGuard>
      <Footer />
    </div>
  )
}

export default UserLayout
