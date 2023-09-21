import { localStorageService } from './localStorageService'
import { queryKeys } from '../constants/queryKeys'
import { uuid, generateColor } from '../helpers'

export const getEntities = () => {
  const entities = localStorageService.load<Entity[]>(queryKeys.entities)

  if (!entities) return [] as Entity[]

  return entities
}

export const getActiveEntity = () => {
  const entities = getEntities()

  if (!entities) return

  const activeEntity = entities.find(({ isActive }) => isActive)

  return activeEntity
}

export const createEntity = (entity: CreateEntityDTO) => {
  const id = uuid()
  const entities = getEntities()

  const updatedEntities = [
    { ...entity, id, comments: [], isActive: false, commentsCount: 0 },
    ...entities
  ]

  localStorageService.save(queryKeys.entities, updatedEntities)

  return updatedEntities
}

export const removeEntity = (id: Uuid) => {
  const entities = getEntities()

  if (!entities) return [] as Entity[]

  const filtered = entities.filter((entity) => entity.id !== id)

  localStorageService.save(queryKeys.entities, filtered)

  return filtered
}

export const createComment = (comment: CreateCommentDTO) => {
  const id = uuid()
  const entities = getEntities()

  if (!entities) return {} as { entities: Entity[]; entity: Entity }

  let updatedEntity: Entity | undefined

  const updatedEntities = entities.map((entity) => {
    if (entity.id !== comment.entityId) {
      return entity
    }

    const color = generateColor()
    const comments = [{ ...comment, color, id }, ...entity.comments]
    const commentsCount = comments.length
    const newEntity = { ...entity, comments, commentsCount }

    updatedEntity = newEntity

    return newEntity
  })

  localStorageService.save(queryKeys.entities, updatedEntities)

  return { entities: updatedEntities, entity: updatedEntity }
}

export const markEntityAsActive = (id: Uuid) => {
  const entities = getEntities()

  if (!entities) {
    return {
      entities: [],
      entity: undefined
    }
  }

  let activeEntity: Entity | undefined

  const updatedEntities = entities.map((entity) => {
    const isActive = entity.id === id

    const updatedEntity = { ...entity, isActive }

    if (isActive) {
      activeEntity = updatedEntity
    }

    return updatedEntity
  })

  localStorageService.save(queryKeys.entities, updatedEntities)

  return { entities: updatedEntities, entity: activeEntity }
}
