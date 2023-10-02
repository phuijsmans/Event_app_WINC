import {
  Button,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const ROOT_URL = "http://localhost:3000/";
const sendRequest = async (method, root_url, eventId) => {
  await fetch(`${root_url}events/${eventId}`, { method });
};

export const DeleteEvent = ({ event }) => {
  const deleteEvent = (event) => {
    console.log("Delete eventID: ", event.id);
    sendRequest("DELETE", ROOT_URL, event.id);
    isDeleted(true);
  };
  const [deleted, isDeleted] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {deleted ? (
        <Navigate to="/" />
      ) : (
        <>
          <Modal isOpen={isOpen} onClose={onClose} size={"md"}>
            <ModalOverlay />{" "}
            <ModalContent p="2em">
              <Text>Are you sure you want to delete event {event.title}?</Text>
              <Button
                onClick={() => deleteEvent(event)}
                backgroundColor={"red.300"}
              >
                Delete it!
              </Button>
            </ModalContent>
          </Modal>
          <Button
            type="submit"
            backgroundColor={"red.300"}
            color={"black"}
            onClick={onOpen}
          >
            DELETE EVENT
          </Button>
        </>
      )}
    </>
  );
};
