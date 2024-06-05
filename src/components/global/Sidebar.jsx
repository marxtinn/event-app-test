import React from "react";
import { Box, Flex, Image, Text, Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SideBarOptions from "./SidebarOptions";
import { sidebarOptions } from "../../helpers/sidebarOptions";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import Logo from "../../assets/images/Support_Service.svg";

function Sidebar() {
  const navigate = useNavigate();
  const toast = useToast();

  const ToastMessage = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 3500,
      isClosable: false,
    });
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
    ToastMessage("Signed Out", `Until next time!`, "success");
  };

  return (
    <Flex
      flexDir={"column"}
      justifyContent={"space-between"}
      h={"100%"}
      borderRadius="xl"
      shadow="2xl"
      bgColor="gray.200"
    >
      <Box>
        {/* Mini Logo */}
        <Box
          display={"flex"}
          justifyContent={"center"}
          w={"100%"}
          alignItems={"center"}
          p={4}
          mb={4}
        >
          <Image src={Logo} w={24} style={{ objectFit: "contain" }} />
        </Box>

        {/* Navigation Options */}
        {sidebarOptions.map((option, idx) => (
          <Box key={idx} my={4} w="75%" mx="auto" shadow="base" rounded="md">
            <SideBarOptions
              label={option.label}
              icon={option.icon}
              url={option.url}
            />
          </Box>
        ))}
      </Box>

      {/* Logout Button */}
      <Flex
        justify="center"
        my={8}
        w="100%"
        alignItems="center"
        flexDirection="column"
      >
        <Button
          bgColor={"white"}
          _hover={{ bgColor: "#bb8afc", textColor: "black" }}
          borderRadius="md"
          w="75%"
          onClick={handleLogout}
        >
          <Flex w="full" justifyContent="space-between" alignItems="center">
            <Text size="lg">Log Out</Text>
            <ArrowRightEndOnRectangleIcon width="20px" height="20px" />
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
}

export default Sidebar;
