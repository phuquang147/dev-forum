import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { IconButton } from '@material-tailwind/react'
import React, { type FC } from 'react'

const Pagination: FC = () => {
  const [active, setActive] = React.useState(1)

  const getItemProps = (index: number): any =>
    ({
      variant: active === index ? 'filled' : 'text',
      color: 'cyan',
      onClick: () => {
        setActive(index)
      },
    } as any)

  const next = (): undefined => {
    if (active === 5) return

    setActive(active + 1)
  }

  const prev = (): undefined => {
    if (active === 1) return

    setActive(active - 1)
  }

  return (
    <div className="flex items-center gap-4">
      <IconButton
        variant="text"
        onClick={prev}
        disabled={active === 1}
        color="cyan"
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <div className="flex items-center gap-2">
        <IconButton {...getItemProps(1)}>1</IconButton>
        <IconButton {...getItemProps(2)}>2</IconButton>
        <IconButton {...getItemProps(3)}>3</IconButton>
        <IconButton {...getItemProps(4)}>4</IconButton>
        <IconButton {...getItemProps(5)}>5</IconButton>
      </div>
      <IconButton
        variant="text"
        onClick={next}
        disabled={active === 5}
        color="cyan"
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  )
}

export default Pagination
