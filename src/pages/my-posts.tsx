import Pagination from '~/components/Shared/Pagination'
import Post from '~/components/Shared/Post'
import UserLayout from '~/layouts/UserLayout'
import { type NextPageWithLayout } from './_app'
import Filter from '~/components/Home/Filter'

const MyPosts: NextPageWithLayout = () => {
  return (
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
  )
}

export default MyPosts

MyPosts.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
