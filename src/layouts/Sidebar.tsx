import {
  BugAntIcon,
  ChatBubbleLeftRightIcon,
  NewspaperIcon,
} from '@heroicons/react/24/outline'
import { InboxIcon } from '@heroicons/react/24/solid'
import { Card, List, ListItem, ListItemPrefix } from '@material-tailwind/react'
import { type FC } from 'react'

const Sidebar: FC = () => {
  return (
    <Card className="sticky h-full w-full rounded-none border-r border-black border-opacity-10 p-4 shadow-none">
      <List>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          All topics
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ChatBubbleLeftRightIcon className="h-5 w-5" />
          </ListItemPrefix>
          Discuss
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <BugAntIcon className="h-5 w-5" />
          </ListItemPrefix>
          Bug
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <NewspaperIcon className="h-5 w-5" />
          </ListItemPrefix>
          Tech news
        </ListItem>
      </List>
    </Card>
  )
}

export default Sidebar
