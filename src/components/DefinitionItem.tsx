import { ReactNode } from "react";

interface Props {
  term: string;
  children: ReactNode | ReactNode[];
}

const DefinitionItem = ({ term, children }: Props) => {
  return (
    <div className="my-5">
      <dt className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {term}
      </dt>
      <dd className="mt-1">{children}</dd>
    </div>
  );
};

export default DefinitionItem;
