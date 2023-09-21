import { ComponentProps, ReactNode } from 'react'

import styles from './ScrollArea.module.css'
import { cn } from '../../../helpers'

type ScrollAreaProps = ComponentProps<'div'> & {
  children: ReactNode
  maxHeight?: number | string
}

export default function ScrollArea({
  children,
  className,
  maxHeight = '580px',
  ...restProps
}: ScrollAreaProps) {
  return (
    <div
      className={cn(styles.scrollArea, className)}
      style={{ maxHeight }}
      {...restProps}
    >
      {children}
    </div>
  )
}
