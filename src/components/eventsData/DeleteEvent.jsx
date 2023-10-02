import { Button } from "@chakra-ui/react";
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
  return (
    <>
      {deleted ? (
        <Navigate to="/" />
      ) : (
        <Button
          type="submit"
          backgroundColor={"red.300"}
          color={"black"}
          onClick={() => deleteEvent(event)}
        >
          DELETE EVENT
        </Button>
      )}
    </>
  );
};
