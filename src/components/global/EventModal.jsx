import React, { useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  RadioGroup,
  Stack,
  Radio,
  Textarea,
} from "@chakra-ui/react";

const EventModal = ({
  isOpen,
  onClose,
  event,
  role,
  onApprove,
  onReject,
  fetchEventData,
}) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  const handleApprove = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/events/approve`,
        {
          uuid: event.id,
          confirmed_date: selectedDate,
          status: "Approved",
        }
      );
      fetchEventData();
      onApprove(event.id, selectedDate);
      onClose();
    } catch (error) {
      console.error("There was a problem with the axios operation:", error);
    }
  };

  const handleReject = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/events/reject`,
        {
          uuid: event.id,
          remarks: rejectionReason,
          status: "Rejected",
        }
      );
      fetchEventData();
      onReject(event.id, rejectionReason);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Event Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            <strong>Event Name:</strong> {event.eventName}
          </Text>
          <Text>
            <strong>Vendor Name:</strong> {event.vendorName}
          </Text>
          <Text>
            <strong>Proposed Dates:</strong> {event.proposedDates.join(", ")}
          </Text>
          <Text>
            <strong>Confirmed Date:</strong> {event.confirmedDate}
          </Text>
          <Text>
            <strong>Status:</strong> {event.status}
          </Text>
          <Text>
            <strong>Date Created:</strong>{" "}
            {new Date(event.dateCreated).toLocaleDateString()}
          </Text>

          {/* Condition for Vendor Role */}
          {role === "Vendor" && (
            <>
              <Box mt={4}>
                <RadioGroup onChange={setSelectedDate} value={selectedDate}>
                  <Stack direction="column">
                    {event.proposedDates.map((date, index) => (
                      <Radio key={index} value={date}>
                        {date}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
                <Button colorScheme="green" onClick={handleApprove} mr={3}>
                  Approve
                </Button>
              </Box>
              <Box mt={4}>
                <Textarea
                  placeholder="Enter rejection reason"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
                <Button colorScheme="red" onClick={handleReject} mr={3}>
                  Reject
                </Button>
              </Box>
            </>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
