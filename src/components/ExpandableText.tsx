import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Props {
  children: string;
}

const ExpandableText = ({ children }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const limit = 300;

  if (!children) return null;

  if (children.length <= limit) return <p>{children}</p>;

  const summary = expanded ? children : children.substring(0, limit) + "...";

  return (
    <p>
      {summary}
      <Button
        size="sm"
        variant="link"
        className="ml-1 p-0 h-auto font-bold text-yellow-500 hover:text-yellow-600"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Show Less" : "Read More"}
      </Button>
    </p>
  );
};

export default ExpandableText;
