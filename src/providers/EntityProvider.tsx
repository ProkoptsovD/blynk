import { createContext, useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import * as apiService from '../services/apiService'

interface EntityContext {
  createComment(comment: CreateCommentDTO): void
  createRecord(record: CreateEntityDTO): void
  deleteRecord(id: Uuid): void
  markAsActive(id: Uuid): void
  entities: Entity[]
  activeEntity?: Entity
}

export const EntityContext = createContext<EntityContext | null>(null)

interface EntityContextProviderProps {
  children: ReactNode
}

const initialEntities = () => apiService.getEntities()

export function EntityContextProvider({
  children
}: EntityContextProviderProps) {
  const [entities, setEntities] = useState<Entity[]>(initialEntities)
  const [activeEntity, setActiveEntity] = useState<Entity | undefined>(
    apiService.getActiveEntity
  )

  const createRecord = useCallback((record: CreateEntityDTO) => {
    const entities = apiService.createEntity(record)
    setEntities(entities)
  }, [])

  const createComment = useCallback((comment: CreateCommentDTO) => {
    const { entities, entity } = apiService.createComment(comment)
    setEntities(entities)
    setActiveEntity(entity)
  }, [])

  const deleteRecord = useCallback(
    (id: Uuid) => {
      const entities = apiService.removeEntity(id)
      setEntities(entities)

      const wasActiveEntityDeleted = activeEntity?.id === id

      if (!wasActiveEntityDeleted) return

      setActiveEntity(undefined)
    },
    [activeEntity]
  )

  const markAsActive = useCallback((id: Uuid) => {
    const { entities, entity } = apiService.markEntityAsActive(id)
    setEntities(entities)
    setActiveEntity(entity)
  }, [])

  const context: EntityContext = useMemo(
    () => ({
      entities,
      createRecord,
      createComment,
      deleteRecord,
      markAsActive,
      activeEntity
    }),
    [
      entities,
      createRecord,
      createComment,
      deleteRecord,
      markAsActive,
      activeEntity
    ]
  )

  return (
    <EntityContext.Provider value={context}>{children}</EntityContext.Provider>
  )
}
