import UserLayout from '~/layouts/UserLayout'
import { type NextPageWithLayout } from './_app'

const SavedPosts: NextPageWithLayout = () => {
  return <div className="container">a</div>
}

export default SavedPosts

SavedPosts.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
