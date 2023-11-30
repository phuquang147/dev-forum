import {
  Card,
  CardBody,
  Checkbox,
  Option,
  Select,
} from '@material-tailwind/react'
import { type FC } from 'react'
import type { IFilter } from '~/resources/interfaces/common.interface'

interface FilterProps {
  filter: IFilter
  onUpdateFilter: (filter: IFilter) => void
}

const Filter: FC<FilterProps> = ({ filter, onUpdateFilter }) => {
  return (
    <Card className="shadow">
      <CardBody className="flex justify-end gap-4 p-4">
        <Checkbox
          crossOrigin=""
          label="Is bountied"
          color="cyan"
          labelProps={{ style: { fontWeight: 500 } }}
          checked={filter.isBountied}
          onChange={(e) => {
            onUpdateFilter({ ...filter, isBountied: e.target.checked })
          }}
        />
        <Checkbox
          crossOrigin=""
          label="Is answered"
          color="cyan"
          labelProps={{ style: { fontWeight: 500 } }}
          checked={filter.filter === 'answered'}
          onChange={(e) => {
            onUpdateFilter({
              ...filter,
              filter: e.target.checked ? 'answered' : 'notAnswered',
            })
          }}
        />
        <div className="w-56">
          <Select
            variant="outlined"
            label="Select Sort"
            color="cyan"
            value={filter.sort}
            onChange={(value) => {
              onUpdateFilter({ ...filter, sort: value ?? 'newest' })
            }}
          >
            <Option value="newest">Newest</Option>
            <Option value="oldest">Oldest</Option>
          </Select>
        </div>
      </CardBody>
    </Card>
  )
}

export default Filter
