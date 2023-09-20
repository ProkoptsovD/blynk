import { createContext, useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import * as apiService from '../services/apiService'

interface EntityContext {
  createComment(comment: CreateCommentDTO): void
  createRecord(record: CreateEntityDTO): void
  deleteRecord(id: Uuid): void
  markAsActive(id: Uuid): void
  entities: Entity[]
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

  const createRecord = useCallback((record: CreateEntityDTO) => {
    const entities = apiService.createEntity(record)
    setEntities(entities)
  }, [])

  const createComment = useCallback((comment: CreateCommentDTO) => {
    const entities = apiService.createComment(comment)
    setEntities(entities)
  }, [])

  const deleteRecord = useCallback((id: Uuid) => {
    const entities = apiService.removeEntity(id)
    setEntities(entities)
  }, [])

  const markAsActive = useCallback((id: Uuid) => {
    const entities = apiService.markEntityAsActive(id)
    setEntities(entities)
  }, [])

  const context: EntityContext = useMemo(
    () => ({
      entities,
      createRecord,
      createComment,
      deleteRecord,
      markAsActive
    }),
    [entities, createRecord, createComment, deleteRecord, markAsActive]
  )

  return (
    <EntityContext.Provider value={context}>{children}</EntityContext.Provider>
  )
}
