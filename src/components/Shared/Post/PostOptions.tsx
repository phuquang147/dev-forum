import { EllipsisHorizontalIcon, FlagIcon } from '@heroicons/react/24/outline'
import {
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Popover,
  PopoverContent,
  PopoverHandler,
} from '@material-tailwind/react'
import { type FC } from 'react'

interface PostOptionsProps {
  postId: string
}

const PostOptions: FC<PostOptionsProps> = ({ postId }) => {
  return (
    <Popover placement="bottom-end">
      <PopoverHandler>
        <IconButton variant="text" size="sm">
          <EllipsisHorizontalIcon className="h-5 w-5" />
        </IconButton>
      </PopoverHandler>
      <PopoverContent>
        <List className="p-0">
          <ListItem className="text-red-500 hover:text-red-500 focus:text-red-500 active:text-red-500">
            <ListItemPrefix>
              <FlagIcon className="text h-5 w-5" />
            </ListItemPrefix>
            Report
          </ListItem>
        </List>
      </PopoverContent>
    </Popover>
  )
}

export default PostOptions
