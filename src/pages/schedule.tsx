import UserLayout from '~/layouts/UserLayout'
import { type NextPageWithLayout } from './_app'

const Schedule: NextPageWithLayout = () => {
  return <div className="container">a</div>
}

export default Schedule

Schedule.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>
}
