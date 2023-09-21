type Uuid = `${string}-${string}-${string}-${string}-${string}`

interface EntityComment {
  id: Uuid
  entityId: Uuid
  commentText: string
  color: string
}

interface Entity {
  id: Uuid
  title: string
  comments: EntityComment[]
  isActive?: boolean
  commentsCount: number
}
