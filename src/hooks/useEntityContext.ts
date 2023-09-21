import { useContext } from 'react'
import { EntityContext } from '../providers/EntityProvider'

export const useEntitiesContext = () => useContext(EntityContext)!
