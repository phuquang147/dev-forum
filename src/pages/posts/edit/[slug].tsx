import { HomeIcon } from '@heroicons/react/24/solid'
import { Breadcrumbs, Typography } from '@material-tailwind/react'
import Head from 'next/head'
import Link from 'next/link'
import PostForm from '~/components/Posts/PostForm'
import MainLayout from '~/layouts/MainLayout'
import { type NextPageWithLayout } from '~/pages/_app'

const EditPost: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Edit Post - Post title</title>
      </Head>
      <div className="container">
        <Breadcrumbs>
          <Link href="/">
            <HomeIcon className="h-4 w-4" />
          </Link>
          <Typography>Edit post</Typography>
        </Breadcrumbs>
        <div className="mx-auto mt-10 h-screen max-w-[800px]">
          <PostForm />
        </div>
      </div>
    </>
  )
}

export default EditPost

EditPost.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>
}
