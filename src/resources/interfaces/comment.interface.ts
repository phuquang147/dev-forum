export interface ICommentFormData {
  postId?: string
  parent?: string
  description: string
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
