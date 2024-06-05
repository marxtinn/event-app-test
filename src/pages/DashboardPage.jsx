import React, { useState, useEffect } from "react";
import Layout from "../components/global/dashboardLayout";
import { Flex, Text, Box, Icon, Heading } from "@chakra-ui/react";
import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import TableTemplate from "../components/global/TableTemplate";
import axios from "axios";

function DashboardPage(props) {
  const username = sessionStorage.getItem("name");
  const role = sessionStorage.getItem("role");
  const company_user_id = sessionStorage.getItem("id");
  const vendor_user_id = sessionStorage.getItem("id");
  const token = sessionStorage.getItem("token");
  const [fetchedEventData, setFetchedEventData] = useState([]);

  // Fetch Event Data related to the user who is logged in.

  const fetchEventData = async () => {
    try {
      if (role === "Company") {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/events/my-events`,
          { company_user_id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const mappedData = response.data.data.map((event) => ({
          id: event.uuid,
          eventName: event.event_name,
          vendorName: event.user.name,
          confirmedDate: event.confirmed_date,
          proposedDates: [
            event.proposed_date_1,
            event.proposed_date_2,
            event.proposed_date_3,
          ],
          status: event.status,
          remarks: event.remarks,
          dateCreated: event.createdAt,
        }));
        setFetchedEventData(mappedData);
      }

      if (role === "Vendor") {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/events/my-event-requests`,
          { vendor_user_id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const mappedData = response.data.data.map((event) => ({
          id: event.uuid,
          eventName: event.event_name,
          companyName: event.user.name,
          confirmedDate: event.confirmed_date,
          proposedDates: [
            event.proposed_date_1,
            event.proposed_date_2,
            event.proposed_date_3,
          ],
          status: event.status,
          remarks: event.remarks,
          dateCreated: event.createdAt,
        }));
        setFetchedEventData(mappedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  // Count Status for Cards
  const pendingCount = fetchedEventData.filter(
    (event) => event.status === "Pending"
  ).length;
  const approvedCount = fetchedEventData.filter(
    (event) => event.status === "Approved"
  ).length;
  const rejectedCount = fetchedEventData.filter(
    (event) => event.status === "Rejected"
  ).length;

  return (
    <Layout>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mx={4}
        py={4}
        h={"96px"}
      >
        <Heading fontWeight="bold" fontSize="x-large">
          Dashboard
        </Heading>
      </Flex>

      <Box m={4}>
        <Flex gap={4}>
          <Heading fontSize="xx-large" fontWeight="slim">
            Welcome,
          </Heading>
          <Heading fontSize="xx-large" fontWeight="semibold">
            {username}!
          </Heading>
        </Flex>
      </Box>

      {/* Cards */}
      <Flex
        justifyContent="center"
        w="75%"
        m={4}
        p={4}
        mx="auto"
        fontSize="large"
        fontWeight="semibold"
      >
        Wellness Events
      </Flex>

      <Flex justifyContent="space-evenly" w="75%" m={4} p={8} mx="auto">
        <Box
          w="200px"
          h="150px"
          bg="yellow.100"
          display="flex"
          flexDirection="column"
          alignItems="start"
          justifyContent="center"
          borderRadius="md"
          p={4}
        >
          <Icon
            as={ClockIcon}
            style={{ width: "48px", height: "48px", color: "#D69E2E" }}
          />
          <Text fontSize="xl" fontWeight="regular">
            Pending
          </Text>
          <Text fontSize="2xl" fontWeight="semibold">
            {pendingCount}
          </Text>
        </Box>

        <Box
          w="200px"
          h="150px"
          bg="green.100"
          display="flex"
          flexDirection="column"
          alignItems="start"
          justifyContent="center"
          borderRadius="md"
          p={4}
        >
          <Icon
            as={CheckCircleIcon}
            style={{ width: "48px", height: "48px", color: "#38A169" }}
          />
          <Text fontSize="xl" fontWeight="regular">
            Approved
          </Text>
          <Text fontSize="2xl" fontWeight="semibold">
            {approvedCount}
          </Text>
        </Box>

        <Box
          w="200px"
          h="150px"
          bg="red.100"
          display="flex"
          flexDirection="column"
          alignItems="start"
          justifyContent="center"
          borderRadius="md"
          p={4}
        >
          <Icon
            as={XCircleIcon}
            style={{ width: "48px", height: "48px", color: "#E53E3E" }}
          />
          <Text fontSize="xl" fontWeight="regular">
            Rejected
          </Text>
          <Text fontSize="2xl" fontWeight="semibold">
            {rejectedCount}
          </Text>
        </Box>
      </Flex>

      {/* Table */}
      <TableTemplate
        events={fetchedEventData}
        fetchEventData={fetchEventData}
      />
    </Layout>
  );
}

export default DashboardPage;
