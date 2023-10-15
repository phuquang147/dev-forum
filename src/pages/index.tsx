import Head from 'next/head'
import Filter from '~/components/Home/Filter'
import Pagination from '~/components/Shared/Pagination'
import Post from '~/components/Home/Post'
import MainLayout from '~/layouts/MainLayout'
import type { NextPageWithLayout } from './_app'

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Dev Forum</title>
      </Head>
      <div className="container flex flex-col gap-4">
        <Filter />
        <ul className="flex flex-col gap-4">
          <li>
            <Post />
          </li>
          <li>
            <Post />
          </li>
          <li>
            <Post />
          </li>
          <li>
            <Post />
          </li>
          <li>
            <Post />
          </li>
        </ul>
        <div className="flex justify-center">
          <Pagination />
        </div>
      </div>
    </>
  )
}

export default Home

Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>
}
