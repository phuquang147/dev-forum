import { HomeIcon } from '@heroicons/react/24/solid'
import { Breadcrumbs } from '@material-tailwind/react'
import Head from 'next/head'
import Link from 'next/link'
import PostForm from '~/components/Posts/PostForm'
import MainLayout from '~/layouts/MainLayout'
import { type NextPageWithLayout } from '../_app'

const PostDetail: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Create Post</title>
      </Head>
      <div className="container">
        <Breadcrumbs>
          <Link href="/">
            <HomeIcon className="h-4 w-4" />
          </Link>
          <Link href="#">Create post</Link>
        </Breadcrumbs>
        <div className="mx-auto mt-10 h-screen max-w-[800px]">
          <PostForm />
        </div>
      </div>
    </>
  )
}

export default PostDetail

PostDetail.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>
}
