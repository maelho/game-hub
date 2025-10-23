interface Props {
  children: React.ReactNode
}

export default function GameCardContainer({ children }: Props) {
  return (
    <div className="w-full overflow-hidden rounded-lg transition-transform duration-150 ease-in hover:scale-105">
      {children}
    </div>
  )
}
