import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Box,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import EventModal from "./EventModal"; // Make sure the path is correct

const TableTemplate = ({ events, fetchEventData }) => {
  const role = sessionStorage.getItem("role");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const viewEvent = (event) => {
    setSelectedEvent(event);
    onOpen();
  };

  // Can be changed to display a toast later
  const handleApprove = (id, date) => {
    console.log(`Approve event ${id} with date ${date}`);
  };

  // Can be changed to display a toast later
  const handleReject = (id, reason) => {
    console.log(`Reject event ${id} with reason ${reason}`);
  };

  const renderTableHeaders = () => {
    return (
      <>
        <Th>Event Name</Th>
        <Th>Vendor Name</Th>
        <Th>Proposed Date 1</Th>
        <Th>Proposed Date 2</Th>
        <Th>Proposed Date 3</Th>
        <Th>Confirmed Date</Th>
        <Th>Status</Th>
        <Th>Date Created</Th>
        <Th>Actions</Th>
      </>
    );
  };

  const renderTableRow = (event) => {
    return (
      <Tr key={event.id}>
        <Td>{event.eventName}</Td>
        <Td>{event.vendorName}</Td>
        <Td>{event.proposedDates[0]}</Td>
        <Td>{event.proposedDates[1]}</Td>
        <Td>{event.proposedDates[2]}</Td>
        <Td>{event.confirmedDate}</Td>
        <Td>{event.status}</Td>
        <Td>{new Date(event.dateCreated).toLocaleDateString()}</Td>
        <Td>
          <Button colorScheme="blue" onClick={() => viewEvent(event)}>
            View
          </Button>
        </Td>
      </Tr>
    );
  };

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4} fontWeight="bold">
        Event List
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>{renderTableHeaders()}</Tr>
        </Thead>
        <Tbody>{events.map((event) => renderTableRow(event))}</Tbody>
      </Table>
      {selectedEvent && (
        <EventModal
          isOpen={isOpen}
          onClose={onClose}
          event={selectedEvent}
          role={role}
          onApprove={handleApprove}
          onReject={handleReject}
          fetchEventData={fetchEventData}
        />
      )}
    </Box>
  );
};

export default TableTemplate;
