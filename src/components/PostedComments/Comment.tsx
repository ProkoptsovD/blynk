import { ReactNode } from 'react'

import styles from './styles.module.css'

type CommentProps = {
  color: string
  children: ReactNode
}

export default function Comment({ children, color }: CommentProps) {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.colorContainer}
        style={{ backgroundColor: color }}
      />

      <p className={styles.comment}>{children}</p>
    </div>
  )
}
