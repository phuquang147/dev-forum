import type { TTopic } from '../types/common.type'
import type { ITag } from './tag.interface'

export interface IPost {
  _id: string
  id: string
  title: string
  description: string
  views: number
  author: {
    _id: string
    displayName: string
    avatar: string
  }
  tags: ITag[]
  createdAt: string
  updateAt: string
  bounty: number
  isAnswered: boolean
  topic: TTopic
  score: {}
  answerCount: number
  slug: string
}

export interface IComment {
  _id: string
  description: string
  author: {
    _id: string
    displayName: string
  }
  is_accepted: boolean
  score: number
  vote: number
}

export interface IPostDetail {
  post: IPost
  comments: IComment[]
}

export interface IPostFormData {
  title: string
  description: string
  topic: TTopic
  tags?: string[]
  bounty?: number
}
