import { Button } from "@chakra-ui/react";

export const EditEvent = ({ event }) => {
  const ROOT_URL = "http://localhost:3000/";
  const sendRequest = async (method, root_url, eventId) => {
    const response = await fetch(`${root_url}events/${eventId}`, { method });

    const result = await response.json();

    return result;
  };

  return (
    <>
      <Button>EDIT EVENT</Button>
    </>
  );
};
