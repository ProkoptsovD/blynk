import { ComponentProps, ReactNode } from 'react'
import styles from './List.module.css'
import { cn } from '../../../helpers'

type ListProps<TItem> = ComponentProps<'ul'> & {
  items: TItem[]
  render?: (item: TItem, index: number) => ReactNode
  className?: string
}

const defaultRender = <TItem,>(item: TItem) => item as ReactNode

export default function List<TItem>({
  items,
  className,
  render = defaultRender,
  ...restProps
}: ListProps<TItem>) {
  const hasItems = items.length > 0

  if (!hasItems) return null

  return (
    <ul className={cn(styles.list, className)} {...restProps}>
      {items.map(render)}
    </ul>
  )
}
