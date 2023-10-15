import Head from 'next/head'
import PostDetail from '~/components/PostDetail/PostDetail'
import SendAnswer from '~/components/PostDetail/SendAnswer'
import MainLayout from '~/layouts/MainLayout'
import { type NextPageWithLayout } from '../_app'
import Answers from '~/components/PostDetail/Answers'

const Post: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Post title</title>
      </Head>
      <div className="container flex flex-col gap-4">
        <PostDetail />
        <Answers />
        <SendAnswer />
      </div>
    </>
  )
}

export default Post

Post.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>
}
