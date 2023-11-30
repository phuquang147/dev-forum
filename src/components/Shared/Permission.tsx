import { LockClosedIcon } from '@heroicons/react/24/outline'
import { Typography } from '@material-tailwind/react'
import { type FC } from 'react'

const Permission: FC = () => {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-4">
      <LockClosedIcon className="h-20 w-20 text-red-500" />
      <Typography>You do not have permission to view this page</Typography>
    </div>
  )
}

export default Permission
