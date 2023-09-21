type CreateEntityDTO = Omit<Entity, 'id' | 'comments' | 'commentsCount'>
type CreateCommentDTO = Pick<EntityComment, 'commentText' | 'entityId'>
