import { XMarkIcon } from '@heroicons/react/24/outline'
import { Chip, IconButton } from '@material-tailwind/react'
import { type FC } from 'react'

interface ChipProps {
  value: string
}

const Tag: FC<ChipProps> = ({ value }) => {
  return (
    <Chip
      value={value}
      color="cyan"
      variant="ghost"
      icon={
        <IconButton variant="text" color="cyan" className="h-5 w-5 p-0">
          <XMarkIcon className="h-4 w-4 text-gray-700" />
        </IconButton>
      }
    />
  )
}

export default Tag
