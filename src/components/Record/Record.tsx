import { cn } from '../../helpers'

import styles from './Record.module.css'

type RecordProps = Pick<Entity, 'id' | 'title'> & {
  className?: string
}

export default function Record({ id, title, className }: RecordProps) {
  return (
    <div className={cn('container', styles.wrapper, className)}>
      <div className={styles.wrapperInner}>
        <div className={styles.titleWrapper}>
          <h1>Record#</h1>
          <p>{id}</p>
        </div>
        <div className={styles.subtitleWrapper}>
          <p>Details:</p>
          <p>{title}</p>
        </div>

        <div className={cn('divider', styles.divider)} />
      </div>
    </div>
  )
}
