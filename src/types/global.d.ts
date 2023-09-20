type Uuid = `${string}-${string}-${string}-${string}-${string}`

interface Comment {
  content: string
  entityId: Uuid
}

interface Entity {
  id: Uuid
  title: string
  comments: Comment[]
  isActive?: boolean
  commentsCount: number
}
