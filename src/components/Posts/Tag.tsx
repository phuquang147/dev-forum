import { XMarkIcon } from '@heroicons/react/24/outline'
import { Chip, IconButton } from '@material-tailwind/react'
import { type FC } from 'react'
import type { ITag } from '~/resources/interfaces/tag.interface'

interface ChipProps {
  tag: ITag
  onUnSelectTag: (id: string) => void
}

const Tag: FC<ChipProps> = ({ tag, onUnSelectTag }) => {
  return (
    <Chip
      value={tag.name}
      color="cyan"
      variant="ghost"
      icon={
        <IconButton variant="text" color="cyan" className="h-5 w-5 p-0">
          <XMarkIcon
            className="h-4 w-4 text-gray-700"
            onClick={() => {
              onUnSelectTag(tag._id)
            }}
          />
        </IconButton>
      }
    />
  )
}

export default Tag
