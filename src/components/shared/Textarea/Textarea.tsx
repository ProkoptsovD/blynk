import { ComponentProps, ReactNode } from 'react'
import ErrorMessage from '../ErrorMessage'
import styles from './Textarea.module.css'
import { cn } from '../../../helpers'

type InputProps = ComponentProps<'textarea'> & {
  label?: ReactNode
  className?: string
  errorMessage?: ReactNode
}

export default function Textarea({
  label,
  className,
  errorMessage,
  ...restProps
}: InputProps) {
  return (
    <div className={cn('input-wrapper', styles.wrapper, className)}>
      <textarea className={cn('input')} {...restProps} />

      {!!label && <label className={cn('label')}>{label}</label>}

      {!!errorMessage && (
        <ErrorMessage className={cn(styles.error)} message={errorMessage} />
      )}
    </div>
  )
}
