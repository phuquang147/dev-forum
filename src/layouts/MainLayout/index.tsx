import { type FC, type ReactNode } from 'react'
import Footer from '../Shared/Footer'
import Header from '../Shared/Header'
import MainSidebar from './MainSidebar'

interface MainLayoutProps {
  children: ReactNode
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 gap-4">
        <div className="relative">
          <MainSidebar />
        </div>
        <div className="h-[calc(100vh - 116px)] flex-1">{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
