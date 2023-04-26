import { Box } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export default function GameCardContainer({ children }: Props) {
  return (
    <Box borderRadius={10} overflow="hidden" width="100%">
      {children}
    </Box>
  );
}
