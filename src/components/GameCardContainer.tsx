import { Box } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export default function GameCardContainer({ children }: Props) {
  return (
    <Box
      borderRadius={10}
      overflow="hidden"
      width="100%"
      _hover={{ transform: "scale(1.03)", transition: "transform .15s ease-in" }}
    >
      {children}
    </Box>
  );
}
