import { Spinner } from '@material-tailwind/react'
import type { color } from '@material-tailwind/react/types/components/spinner'
import { type FC } from 'react'

interface LoadingProps {
  color?: color
  size?: 'sm' | 'default'
}

const Loading: FC<LoadingProps> = ({ color = 'cyan', size = 'default' }) => {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center">
      <Spinner
        color={color}
        className={`${size === 'default' ? 'h-8 w-8' : 'h-5 w-5'} `}
      />
    </div>
  )
}

export default Loading
