import UserLayout from '~/layouts/UserLayout'
import { type NextPageWithLayout } from './_app'

const MyPosts: NextPageWithLayout = () => {
  return <div className="container">a</div>
}

export default MyPosts

MyPosts.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
