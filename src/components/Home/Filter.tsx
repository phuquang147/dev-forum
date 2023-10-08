import { Card, CardBody, Option, Select } from '@material-tailwind/react'
import { type FC } from 'react'

const Filter: FC = () => {
  return (
    <Card className="shadow">
      <CardBody className="flex justify-between p-4">
        <div className="w-56">
          <Select variant="outlined" label="Select Filter" color="cyan">
            <Option>All</Option>
            <Option>Answered</Option>
            <Option>Not Answered</Option>
            <Option>Bountied</Option>
          </Select>
        </div>
        <div className="w-56">
          <Select variant="outlined" label="Select Sort" color="cyan">
            <Option>Newest</Option>
            <Option>Latest</Option>
          </Select>
        </div>
      </CardBody>
    </Card>
  )
}

export default Filter
