import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { getPostBySlugFn } from '~/api/postApi'
import Answers from '~/components/PostDetail/Answers'
import PostDetail from '~/components/PostDetail/PostDetail'
import SendAnswer from '~/components/PostDetail/SendAnswer'
import Loading from '~/components/UI/Loading'
import MainLayout from '~/layouts/MainLayout'
import { showToast } from '~/utils/toast'
import { type NextPageWithLayout } from '../_app'

const PostDetailPage: NextPageWithLayout = () => {
  const router = useRouter()
  const session = useSession()

  const { data: postData, isLoading } = useQuery({
    queryKey: ['post', router.query.slug],
    queryFn: async () =>
      await getPostBySlugFn({
        slug: router.query.slug as string,
      }),
    onError: (error: any) => {
      showToast('error', error.response.data.message)
    },
  })

  return (
    <>
      <Head>
        <title>
          {postData?.data ? postData.data.post.title : 'Post detail'}
        </title>
      </Head>
      <div className="container flex h-full flex-col gap-4">
        {isLoading || !postData?.data ? (
          <Loading />
        ) : (
          <>
            <PostDetail post={postData?.data.post} />
            <Answers postDetail={postData?.data} />
            {session.status === 'authenticated' && (
              <SendAnswer postId={postData.data.post._id} />
            )}
          </>
        )}
      </div>
    </>
  )
}

export default PostDetailPage

PostDetailPage.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>
}
