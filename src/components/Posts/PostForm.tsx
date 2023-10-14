import { Button, Input, Option, Select } from '@material-tailwind/react'
import { useState, type FC } from 'react'
import Editor from '../Shared/Editor'
import Tag from './Tag'

const PostForm: FC = () => {
  const [content, setContent] = useState<string>('')

  const handleChangeContent = (newContent: string): void => {
    setContent(newContent)
  }

  return (
    <form className="flex flex-col gap-4">
      <Input crossOrigin="" label="Title" color="cyan" size="lg" />
      <Select size="lg" label="Topic" color="cyan">
        <Option>Discuss</Option>
        <Option>Bug</Option>
        <Option>Tech news</Option>
      </Select>
      <Select size="lg" label="Selec tags" color="cyan">
        <Option>React</Option>
        <Option>Javascript</Option>
      </Select>
      <div className="flex gap-2">
        <Tag value="React" />
        <Tag value="Javascript" />
      </div>
      <Editor value={content} onChange={handleChangeContent} />
      <div className="flex justify-end gap-4">
        <Button variant="text" color="cyan" className="mt-11">
          Save as draft
        </Button>
        <Button color="cyan" className="mt-11">
          Create Post
        </Button>
      </div>
    </form>
  )
}

export default PostForm
