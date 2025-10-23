import type { ReactNode } from 'react'

interface Props {
  term: string
  children: ReactNode | ReactNode[]
}

const DefinitionItem = ({ term, children }: Props) => {
  return (
    <div className="my-5">
      <dt className="font-medium text-muted-foreground text-sm">{term}</dt>
      <dd className="mt-1">{children}</dd>
    </div>
  )
}

export default DefinitionItem
