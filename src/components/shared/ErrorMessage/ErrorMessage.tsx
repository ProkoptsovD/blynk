import { ComponentProps, ReactNode } from 'react'
import { cn } from '../../../helpers'

import styles from './ErrorMessage.module.css'

type ErrorMessageProps = ComponentProps<'strong'> & {
  message: ReactNode
}

export default function ErrorMessage({
  message,
  className,
  ...restProps
}: ErrorMessageProps) {
  return (
    <strong className={cn(styles.error, className)} {...restProps}>
      {message}
    </strong>
  )
}
