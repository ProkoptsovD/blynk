import { ComponentProps, ReactNode } from 'react'
import ErrorMessage from '../ErrorMessage'
import styles from './Input.module.css'
import { cn } from '../../../helpers'

type InputProps = ComponentProps<'input'> & {
  label?: ReactNode
  className?: string
  errorMessage?: ReactNode
}

export default function Input({
  label,
  className,
  errorMessage,
  ...restProps
}: InputProps) {
  return (
    <div className={cn('input-wrapper', styles.wrapper, className)}>
      <input className={cn('input')} {...restProps} />

      {!!label && <label className={cn('label')}>{label}</label>}

      {!!errorMessage && (
        <ErrorMessage className={cn(styles.error)} message={errorMessage} />
      )}
    </div>
  )
}
