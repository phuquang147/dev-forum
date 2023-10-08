import { Button, Typography } from '@material-tailwind/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import MainLayout from '~/layouts/MainLayout'
import { type NextPageWithLayout } from './_app'
import Head from 'next/head'

const NotFound: NextPageWithLayout = () => {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Không tìm thấy trang</title>
      </Head>
      <div className="flex h-screen min-h-[500px] w-full flex-col items-center justify-center">
        <div className="relative aspect-square w-[90%] max-w-[200px]">
          <Image src="/images/404.svg" alt="404" fill />
        </div>
        <Typography variant="h6">Không tìm thấy trang</Typography>
        <Button
          variant="gradient"
          color="cyan"
          className="mt-4"
          onClick={() => {
            router.push('/')
          }}
        >
          Về trang chủ
        </Button>
      </div>
    </>
  )
}

export default NotFound

NotFound.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>
}
