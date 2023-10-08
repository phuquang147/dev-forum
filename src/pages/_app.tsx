import { ThemeProvider } from '@material-tailwind/react'
import { type NextPage } from 'next'
import type { AppProps, AppType } from 'next/app'
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

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App: AppType<AppPropsWithLayout> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page: NextPage) => page)

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
