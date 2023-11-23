import { ThemeProvider } from '@material-tailwind/react'
import { Nunito } from '@next/font/google'
import { type NextComponentType, type NextPage } from 'next'
import { SessionProvider } from 'next-auth/react'
import type { AppContext, AppInitialProps, AppLayoutProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import 'react-quill/dist/quill.snow.css'
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
  const queryClient = new QueryClient()

  return (
    <SessionProvider>
      {getLayout(
        <>
          <style jsx global>{`
            html {
              font-family: ${nunito.style.fontFamily};
            }
          `}</style>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </ThemeProvider>
          <Toaster containerStyle={{ zIndex: 999999 }} />
        </>
      )}
    </SessionProvider>
  )
}

export default App
