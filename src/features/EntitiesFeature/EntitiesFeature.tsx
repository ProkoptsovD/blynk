import { ReactNode, useEffect, useState } from 'react'
import EmptyState from '../../components/shared/EmptyState'
import { useEntitiesContext } from '../../hooks/useEntityContext'

import styles from './EntitiesFeature.module.css'
import Input from '../../components/shared/Input'
import Button from '../../components/shared/Button'
import List from '../../components/shared/List'
import ListItem from '../../components/shared/ListItem'
import RecordListItem from '../../components/RecordListItem'
import { validate } from '../../helpers/validation'

const validationSchema = { entity: { required: 'Record title is required' } }

export default function EntitiesFeature() {
  const [entity, setEntity] = useState<string>('')
  const [error, setError] = useState<ReactNode>()

  const context = useEntitiesContext()
  const { entities, createRecord, deleteRecord, markAsActive } = context

  useEffect(() => {
    if (error && entity !== '') {
      setError(null)
    }
  }, [entity, error])

  const handleButtonClick = () => {
    const errors = validate({ entity }, validationSchema)

    if (errors) {
      return setError(errors['entity'] as ReactNode)
    }

    createRecord({ title: entity })
  }

  const hasEntities = entities.length > 0

  return (
    <div>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <Input
          value={entity}
          placeholder="Create a record..."
          onChange={(e) => setEntity(e.target.value)}
          errorMessage={error}
        />
        <Button className={styles.button} onClick={handleButtonClick}>
          Add
        </Button>
      </form>

      {!hasEntities && <EmptyState />}

      {hasEntities && (
        <List
          items={entities}
          render={({ id, title, isActive, commentsCount }) => (
            <ListItem key={id} className={styles.listItem}>
              <RecordListItem
                title={title}
                id={id}
                isActive={isActive}
                commentsCount={commentsCount}
                onClick={markAsActive}
                onDelete={deleteRecord}
              />
            </ListItem>
          )}
        />
      )}
    </div>
  )
}
