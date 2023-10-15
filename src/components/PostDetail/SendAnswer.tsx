import { Button, Card, Typography } from '@material-tailwind/react'
import { useState, type FC } from 'react'
import Editor from '../Shared/Editor'

const SendAnswer: FC = () => {
  const [answer, setAnswer] = useState<string>('')

  const handleChangeAnswer = (value: string): void => {
    setAnswer(value)
  }

  return (
    <Card className="flex flex-col gap-4 p-6 shadow">
      <Typography variant="h6">Your Answer</Typography>
      <Editor value={answer} onChange={handleChangeAnswer} />
      <Button color="cyan" variant="gradient" className="self-end">
        Post your answer
      </Button>
    </Card>
  )
}

export default SendAnswer
