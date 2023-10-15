import { Typography } from '@material-tailwind/react'
import { type FC } from 'react'

interface PageHeadingProps {
  content: string
}
const PageHeading: FC<PageHeadingProps> = ({ content }) => {
  return (
    <Typography variant="h1" className="text-2xl" color="gray">
      {content}
    </Typography>
  )
}

export default PageHeading
