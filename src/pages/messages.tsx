import UserLayout from '~/layouts/UserLayout'
import { type NextPageWithLayout } from './_app'

const Messages: NextPageWithLayout = () => {
  return <div className="container">a</div>
}

export default Messages

Messages.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
