import type { color } from '@material-tailwind/react/types/components/chip'
import type { TTopic } from '~/resources/types/common.type'

export const getChipColorByTopic = (topic: TTopic): color => {
  switch (topic) {
    case 'bug':
      return 'pink'
    case 'discuss':
      return 'green'
    case 'news':
      return 'cyan'
    default:
      return 'gray'
  }
}
