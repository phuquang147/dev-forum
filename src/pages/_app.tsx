import { ThemeProvider } from '@material-tailwind/react'
import { type NextComponentType, type NextPage } from 'next'
import type { AppContext, AppInitialProps, AppLayoutProps } from 'next/app'
import { Nunito } from 'next/font/google'
import type { ReactElement, ReactNode } from 'react'
import '~/styles/globals.css'

const nunito = Nunito({
  subsets: ['vietnamese'],
  weight: ['300', '400', '500', '600', '700'],
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

const App: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page)
  return getLayout(
    <>
      <style jsx global>{`
        html {
          font-family: ${nunito.style.fontFamily};
        }
      `}</style>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default App
