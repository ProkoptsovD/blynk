import { ReactNode } from 'react'

import styles from './Sidebar.module.css'
import Collapse from '../shared/Collapse/Collapse'
import ScrollArea from '../shared/ScrollArea'

type SidebarProps = {
  children: ReactNode
}

export default function Sidebar({ children }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <p className={styles.title}>Fancy sidebar</p>

      <div className="divider"></div>

      <Collapse open title="Your records">
        <ScrollArea>{children}</ScrollArea>
      </Collapse>
    </aside>
  )
}
