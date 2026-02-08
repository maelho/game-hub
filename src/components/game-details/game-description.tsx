interface GameDescriptionProps {
  description: string | null | undefined
}

export default function GameDescription({ description }: GameDescriptionProps) {
  if (!description) {
    return <p className="text-industrial-text-tertiary text-sm">No description available.</p>
  }

  // biome-ignore lint/security/noDangerouslySetInnerHtml: ... ok.
  return <div className="prose-industrial" dangerouslySetInnerHTML={{ __html: description }} />
}
