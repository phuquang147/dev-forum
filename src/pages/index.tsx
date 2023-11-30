import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { getPostsFn } from '~/api/postApi'
import Filter from '~/components/Shared/Filter'
import Post from '~/components/Shared/Post'
import Loading from '~/components/UI/Loading'
import MainLayout from '~/layouts/MainLayout'
import type { IFilter } from '~/resources/interfaces/common.interface'
import type { TTopic } from '~/resources/types/common.type'
import { showToast } from '~/utils/toast'
import { encodeQueryData } from '~/utils/url'
import type { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  const session = useSession()
  const router = useRouter()

  const [filter, setFilter] = useState<IFilter>({
    filter: 'notAnswered',
    isBountied: false,
    sort: 'newest',
    topic:
      router.asPath === '/' ? 'all' : (router.asPath.split('/')[1] as TTopic),
  })

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      topic:
        router.asPath === '/' ? 'all' : (router.asPath.split('/')[1] as TTopic),
    }))
  }, [router.asPath])

  const { data: postsData, isLoading } = useQuery({
    queryKey: ['posts', filter],
    queryFn: async () =>
      await getPostsFn({
        jwt: session.data?.user?.access_token ?? '',
        query: encodeQueryData(filter),
      }),
    onError: (error: any) => {
      showToast('error', error.response.data.message)
    },
  })

  const handleUpdateFilter = (filter: IFilter): void => {
    setFilter(filter)
  }

  return (
    <>
      <Head>
        <title>Dev Forum</title>
      </Head>
      <div className="container flex h-full flex-col gap-4">
        <Filter filter={filter} onUpdateFilter={handleUpdateFilter} />
        {isLoading ? (
          <Loading />
        ) : (
          <ul className="flex flex-col gap-4">
            {postsData?.data.map((post) => (
              <li key={post._id}>
                <Post post={post} />
              </li>
            ))}
          </ul>
        )}
        {/* <div className="flex justify-center">
            <Pagination />
          </div> */}
      </div>
    </>
  )
}

export default Home

Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>
}
