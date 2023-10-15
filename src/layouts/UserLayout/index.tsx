import { type FC, type ReactNode } from 'react'
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
      <div className="flex flex-1 gap-4">
        <div className="relative">
          <UserSidebar />
        </div>
        <div className="h-full flex-1">{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default UserLayout
