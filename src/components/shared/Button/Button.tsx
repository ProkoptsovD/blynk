import { ComponentProps, ReactNode } from 'react'

import styles from './Button.module.css'
import { cn } from '../../../helpers'

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

export default function Button({
  children,
  className,
  type = 'button',
  ...restProps
}: ButtonProps) {
  return (
    <button type={type} className={cn(styles.button, className)} {...restProps}>
      {children}
    </button>
  )
}
