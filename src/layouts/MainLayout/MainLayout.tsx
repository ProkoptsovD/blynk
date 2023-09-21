import { ReactNode } from 'react'
import Sidebar from '../../components/Sidebar'

import styles from './MainLayout.module.css'

interface MainLayoutProps {
  children: ReactNode
  slots?: {
    sidebar?: ReactNode
  }
}

const defaultSlots = {}

export default function MainLayout({
  children,
  slots = defaultSlots
}: MainLayoutProps) {
  const { sidebar } = slots

  return (
    <div className={styles.mainLayout}>
      <Sidebar>{sidebar}</Sidebar>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
