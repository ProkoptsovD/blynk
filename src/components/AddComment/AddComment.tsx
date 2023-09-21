import { ReactNode, useEffect, useState } from 'react'
import Button from '../shared/Button'
import Textarea from '../shared/Textarea'
import { ValidationRules, validate } from '../../helpers/validation'

import styles from './AddComment.module.css'

type CommentProps<TValues> = {
  onAddComment: (comment: string) => void
  validationRules?: ValidationRules<TValues>
}

export default function AddComment<TValues>({
  onAddComment,
  validationRules
}: CommentProps<TValues>) {
  const [comment, setComment] = useState<string>('')
  const [error, setError] = useState<ReactNode>()

  useEffect(() => {
    if (error && comment !== '') {
      setError(null)
    }
  }, [comment, error])

  const handleAddComment = () => {
    const errors = validate({ comment }, validationRules ?? {})

    if (errors) {
      return setError(errors['comment'] as ReactNode)
    }

    onAddComment(comment)
    setComment('')
  }

  return (
    <div className="container">
      <Textarea
        value={comment}
        className={styles.textarea}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Enter your comment..."
        errorMessage={error}
      />
      <Button onClick={handleAddComment} className={styles.button}>
        Add comment
      </Button>
    </div>
  )
}
