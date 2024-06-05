import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Flex,
  Text,
  InputGroup,
  Input,
  InputRightElement,
  Icon,
  Button,
  useToast,
} from "@chakra-ui/react";
import {
  AtSymbolIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../../reducers/auth";

export default function LoginForm(props) {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // States
  const [showPassword, setShowPassword] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  // Toast Alerts
  const toastMessage = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 3500,
      isClosable: false,
    });
  };

  // Handle Clicks
  const handleClick = () => setShowPassword(!showPassword);

  // Login
  const onBtnLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/auth`,
        {
          email: emailInput,
          password: passwordInput,
        }
      );

      const data = response.data;

      const { id, name, role, token, success } = data;

      if (success) {
        sessionStorage.setItem("id", id);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("token", token);
        dispatch(loginAction(response.data));

        navigate("/dashboard", { replace: true });
        toastMessage(`Welcome, ${name}!`, `Login successful.`, `success`);
      } else {
        toastMessage(
          "Oops, something went wrong.",
          "Please contact the site administrator for support",
          "error"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      flexDir={"column"}
      w={{ base: "full", md: "50%" }}
      minHeight={"screen"}
      justify={"center"}
      align={"center"}
    >
      <Text fontSize={"3xl"} fontWeight={"semibold"} mb={8}>
        Sign In
      </Text>

      {/* -----------------Email----------------- */}
      <InputGroup w={"50%"} mb={4}>
        <Input
          type="email"
          size={"md"}
          placeholder="Email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <InputRightElement>
          <Icon as={AtSymbolIcon} my={"auto"} color={"#8592a4"} />
        </InputRightElement>
      </InputGroup>

      {/* -----------------Password----------------- */}
      <InputGroup w={"50%"} mb={4}>
        <Input
          type={showPassword ? "text" : "password"}
          size={"md"}
          placeholder="Password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <InputRightElement>
          <Button onClick={handleClick} bg={"inherit"} variant={"unstyled"}>
            {showPassword ? (
              <Icon as={EyeSlashIcon} my={"auto"} color={"#8592a4"} />
            ) : (
              <Icon as={EyeIcon} my={"auto"} color={"#8592a4"} />
            )}
          </Button>
        </InputRightElement>
      </InputGroup>

      {/* -----------------Sign In Button----------------- */}
      <Button
        w={"50%"}
        bg={"#bb8afc"}
        textColor={"white"}
        type="button"
        onClick={onBtnLogin}
      >
        Sign In
      </Button>
    </Flex>
  );
}
