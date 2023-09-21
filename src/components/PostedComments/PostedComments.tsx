import List from '../shared/List'
import Comment from './Comment'

import styles from './styles.module.css'

type PostedCommentsProps = Pick<Entity, 'comments'>

export default function PostedComments({ comments }: PostedCommentsProps) {
  return (
    <List
      className={styles.list}
      items={comments}
      render={({ id, commentText, color }) => (
        <li key={id}>
          <Comment color={color}>{commentText}</Comment>
        </li>
      )}
    />
  )
}
