import { ComponentProps, ReactNode } from 'react'

type ListItemProps = ComponentProps<'li'> & {
  children: ReactNode
}

export default function ListItem({ children, ...restProps }: ListItemProps) {
  return <li {...restProps}>{children}</li>
}
