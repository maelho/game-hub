interface Props {
  score?: number;
}

export default function CriticScore({ score }: Props) {
  if (!score) return null;

  const getScoreColor = (score: number) => {
    if (score > 75) return "bg-green-600 text-white border-green-700";
    if (score > 60) return "bg-yellow-600 text-white border-yellow-700";
    return "bg-red-600 text-white border-red-700";
  };

  return (
    <span
      className={`text-xs font-bold px-2 py-1 rounded border ${getScoreColor(score)}`}
    >
      {score}
    </span>
  );
}
