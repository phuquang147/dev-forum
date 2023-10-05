import { Button } from '@material-tailwind/react'
import { Inter } from 'next/font/google'
import type { FC } from 'react'

const inter = Inter({ subsets: ['latin'] })

const Home: FC = () => {
  return (
    <main
      className={`mt-0 flex min-h-screen flex-col items-center justify-between text-ellipsis p-24 ${inter.className}`}
    >
      <Button>Button</Button>
    </main>
  )
}

export default Home
