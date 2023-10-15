import { type FC, type ReactNode } from 'react'
import Footer from '../Shared/Footer'
import Header from '../Shared/Header'
import MainSidebar from './MainSidebar'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <Header />
      <div className="flex gap-4">
        <div className="relative">
          <MainSidebar />
        </div>
        <div className="h-full flex-1">{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
