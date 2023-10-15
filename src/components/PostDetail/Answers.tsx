import { Card } from '@material-tailwind/react'
import { type FC } from 'react'
import Answer from './Answer'
import Pagination from '../Shared/Pagination'

const Answers: FC = () => {
  return (
    <Card className="flex flex-col items-center gap-4 p-6 shadow">
      <Answer />
      <hr className="w-full" />
      <Answer />
      <Pagination />
    </Card>
  )
}

export default Answers
