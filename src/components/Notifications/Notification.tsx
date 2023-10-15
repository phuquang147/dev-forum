import { ClockIcon } from '@heroicons/react/24/outline'
import { Avatar, Typography } from '@material-tailwind/react'
import Link from 'next/link'
import { type FC } from 'react'

const Notification: FC = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-4 rounded-lg p-4 hover:shadow"
    >
      <Avatar
        variant="circular"
        alt="tania andrew"
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
      />
      <div className="flex flex-col gap-1">
        <Typography variant="small" color="gray" className="font-normal">
          <span className="font-medium text-blue-gray-900">Tania</span> send you
          a message
        </Typography>
        <Typography
          variant="small"
          className="flex items-center gap-1 text-xs text-gray-600"
        >
          <ClockIcon className="h-4 w-4" />a hour ago 13 minutes ago
        </Typography>
      </div>
    </Link>
  )
}

export default Notification
