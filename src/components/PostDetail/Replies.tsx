import { type FC } from 'react'
import Answer from './Answer'

const Replies: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <hr />
      <Answer isMainAnswer={false} />
      <hr />
      <Answer isMainAnswer={false} />
    </div>
  )
}

export default Replies
