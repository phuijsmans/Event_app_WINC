import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";

export const Root = () => {
  return (
    <Box bg="blue.100">
      <Navigation />
      <Outlet />
    </Box>
  );
};
