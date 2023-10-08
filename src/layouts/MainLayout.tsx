import { type FC, type ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative max-h-screen">
      <Header />
      <div className="flex gap-4">
        <div className="relative">
          <Sidebar />
        </div>
        <div className="h-full flex-1">{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
