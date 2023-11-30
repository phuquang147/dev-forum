import type { TPostAnswerStatus, TSort, TTopic } from '../types/common.type'

export interface IFilter {
  isBountied: boolean
  sort: TSort
  filter: TPostAnswerStatus
  isMyPosts?: boolean
  topic: TTopic
  search?: string | undefined
}
