import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import SupportServiceImage from "../../assets/images/Support_Service.svg";

function WelcomeSection() {
  return (
    <Box
      p={20}
      display="flex"
      flexDir="column"
      w={"100%"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Image
        src={SupportServiceImage}
        alt="Support Service"
        boxSize={300}
        style={{ objectFit: "contain" }}
        w={"2xl"}
      />
      <Text fontSize="3xl" textAlign="center" fontWeight={"bold"}>
        Event Booking App
      </Text>
    </Box>
  );
}

export default WelcomeSection;
