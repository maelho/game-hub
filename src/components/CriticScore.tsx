import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Props {
  score: number;
}

export default function CriticScore({ score }: Props) {
  const getScoreColor = (score: number) => {
    if (score > 75) return "bg-green-500 hover:bg-green-600";
    if (score > 60) return "bg-yellow-500 hover:bg-yellow-600";
    return "bg-gray-500 hover:bg-gray-600";
  };

  return (
    <Badge
      className={cn(
        "text-white px-2 py-1 text-sm rounded",
        getScoreColor(score),
      )}
    >
      {score}
    </Badge>
  );
}
