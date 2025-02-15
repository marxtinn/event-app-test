import React from "react";
import { Grid, GridItem, Box } from "@chakra-ui/react";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <Grid
      templateColumns={{ base: "1fr", md: "1.5fr 6fr" }}
      gap={6}
      p={8}
      h="100vh"
      bgGradient="radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)"
    >
      <GridItem>
        {/* Sidebar */}
        <Sidebar h="95vh" borderRadius="md" p={4} />
      </GridItem>
      <GridItem>
        {/* Main Content */}
        <Box bg="gray.200" h="100%" borderRadius="xl" p={4} shadow="2xl">
          {children}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Layout;
