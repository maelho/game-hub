import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  children: string
}

const ExpandableText = ({ children }: Props) => {
  const [expanded, setExpanded] = useState(false)
  const limit = 300

  if (!children) return null

  if (children.length <= limit) return <p>{children}</p>

  const summary = expanded ? children : `${children.substring(0, limit)}...`

  return (
    <p>
      {summary}
      <Button
        className="ml-1 h-auto p-0 font-bold text-primary hover:text-primary/80"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Show Less' : 'Read More'}
      </Button>
    </p>
  )
}

export default ExpandableText
