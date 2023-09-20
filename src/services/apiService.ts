import { localStorageService } from './localStorageService'
import { queryKeys } from '../constants/queryKeys'

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID
 */
const uuid = () => crypto.randomUUID()

export const getEntities = () => {
  const entities = localStorageService.load<Entity[]>(queryKeys.entities)

  if (!entities) return []

  return entities as Entity[]
}

export const createEntity = (entity: CreateEntityDTO) => {
  const id = uuid()
  const entities = getEntities()

  const updatedEntities = [{ ...entity, id }, entities]

  localStorageService.save(queryKeys.entities, updatedEntities)

  return updatedEntities as Entity[]
}

export const removeEntity = (id: Uuid) => {
  const entities = getEntities()

  if (!entities) return []

  const filtered = entities.filter((entity) => entity.id !== id)

  localStorageService.save(queryKeys.entities, filtered)

  return filtered as Entity[]
}

export const createComment = (comment: CreateCommentDTO) => {
  const entities = getEntities()

  if (!entities) return []

  const updatedEntities = entities.map((entity) => {
    if (entity.id !== comment.entityId) {
      return entity
    }

    return {
      ...entity,
      comments: [comment, ...entity.comments]
    }
  })

  localStorageService.save(queryKeys.entities, updatedEntities)

  return updatedEntities as Entity[]
}

export const markEntityAsActive = (id: Uuid) => {
  const entities = getEntities()

  if (!entities) return []

  const updatedEntities = entities.map((entity) => {
    const isActive = entity.id === id

    return { ...entity, isActive }
  })

  localStorageService.save(queryKeys.entities, updatedEntities)

  return updatedEntities as Entity[]
}
