import { HomeIcon } from '@heroicons/react/24/solid'
import { Breadcrumbs, Typography } from '@material-tailwind/react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { getPostBySlugFn } from '~/api/postApi'
import PostForm from '~/components/Posts/PostForm'
import AuthenticationGuard from '~/components/Shared/AuthenticationGuard'
import Loading from '~/components/UI/Loading'
import MainLayout from '~/layouts/MainLayout'
import { type NextPageWithLayout } from '~/pages/_app'
import { showToast } from '~/utils/toast'

const EditPost: NextPageWithLayout = () => {
  const router = useRouter()
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
    <AuthenticationGuard>
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
        <div className="mx-auto mt-10 max-w-[800px]">
          {isLoading ? (
            <Loading />
          ) : (
            <PostForm post={postData?.data.post} type="edit" />
          )}
        </div>
      </div>
    </AuthenticationGuard>
  )
}

export default EditPost

EditPost.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>
}
