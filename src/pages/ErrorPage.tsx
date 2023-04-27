import { Box, Heading, Text } from "@chakra-ui/react";

import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <NavBar />
      <Box padding={10}>
        <Heading>Ooops!</Heading>
        <Text>{isRouteErrorResponse(error) ? "This page does not exist." : "An unexpected error occurred."}</Text>
      </Box>
    </>
  );
}
