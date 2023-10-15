import UserLayout from '~/layouts/UserLayout'
import { type NextPageWithLayout } from './_app'
import Filter from '~/components/Home/Filter'
import Post from '~/components/Shared/Post'
import Pagination from '~/components/Shared/Pagination'

const SavedPosts: NextPageWithLayout = () => {
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

export default SavedPosts

SavedPosts.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
