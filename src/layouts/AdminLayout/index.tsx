import { type FC, type ReactNode } from 'react'
import AuthenticationGuard from '~/components/Shared/AuthenticationGuard'
import AuthorizationGuard from '~/components/Shared/AuthorizationGuard'
import Footer from '../Shared/Footer'
import Header from '../Shared/Header'
import AdminSidebar from './AdminSidebar'

interface AdminLayoutProps {
  children: ReactNode
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 flex-col">
        <AuthenticationGuard>
          <AuthorizationGuard>
            <div className="flex gap-4">
              <div className="relative">
                <AdminSidebar />
              </div>
              <div className="h-full min-h-[calc(100vh-116px)] flex-1">
                {children}
              </div>
            </div>
          </AuthorizationGuard>
        </AuthenticationGuard>
      </div>
      <Footer />
    </div>
  )
}

export default AdminLayout
