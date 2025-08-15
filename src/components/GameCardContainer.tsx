interface Props {
  children: React.ReactNode;
}

export default function GameCardContainer({ children }: Props) {
  return (
    <div className="rounded-lg overflow-hidden w-full hover:scale-105 transition-transform duration-150 ease-in">
      {children}
    </div>
  );
}
