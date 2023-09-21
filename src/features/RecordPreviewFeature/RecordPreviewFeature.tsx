import AddComment from '../../components/AddComment'
import PostedComments from '../../components/PostedComments/PostedComments'
import Record from '../../components/Record'

import { useEntitiesContext } from '../../hooks/useEntityContext'

import styles from './RecordPreviewFeature.module.css'

const validationSchema = {
  comment: { required: "Comment mustn't be empty" }
}

export default function RecordPreviewFeature() {
  const { activeEntity, createComment } = useEntitiesContext()

  if (!activeEntity) return null

  const { comments, title, id } = activeEntity

  return (
    <div className={styles.wrapper}>
      <Record title={title} id={id} className={styles.mb} />

      <div className="container">
        <label className={styles.commentSectionTitle}>Comments</label>

        <AddComment
          validationRules={validationSchema}
          onAddComment={(c) => createComment({ commentText: c, entityId: id })}
        />

        <PostedComments comments={comments} />
      </div>
    </div>
  )
}
