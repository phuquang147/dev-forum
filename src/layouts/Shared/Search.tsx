import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { IconButton } from '@material-tailwind/react'
import { useRouter } from 'next/navigation'
import { useState, type FC } from 'react'
import Input from '~/components/UI/Input'

const Search: FC = () => {
  const router = useRouter()
  const [search, setSearch] = useState<string>('')

  const handleSearch = (): void => {
    if (search.trim().length > 0) {
      router.push(`?search=${search.trim()}`)
    } else {
      router.push('/')
    }
  }

  return (
    <div className="relative flex w-full gap-2 md:w-max">
      <Input
        type="search"
        placeholder="Search posts..."
        className="\ w-64 !border-2 !border-gray-300 bg-white text-gray-900 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-cyan-500 focus:!border-t-cyan-500"
        labelProps={{
          className: 'hidden',
        }}
        containerProps={{ className: 'min-w-[100px]' }}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
      />
      <IconButton
        size="sm"
        color="cyan"
        className="!absolute right-1 top-1 rounded"
        onClick={handleSearch}
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
      </IconButton>
    </div>
  )
}

export default Search
