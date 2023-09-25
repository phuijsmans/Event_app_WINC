import { Button } from "@chakra-ui/react";

// export const deleteEvent = async ({ request }) => {
//   console.log("Delete event: ", request);
// };
const ROOT_URL = "http://localhost:3000/";
const sendRequest = async (method, root_url, eventId) => {
  const response = await fetch(`${root_url}events/${eventId}`, { method });

  const result = await response.json();

  return result;
};

export const DeleteEvent = ({ event }) => {
  const deleteEvent = (event) => {
    console.log("Delete eventID: ", event.id);
    sendRequest("DELETE", ROOT_URL, event.id);
  };
  return (
    <>
      <Button
        type="submit"
        backgroundColor={"red.300"}
        color={"black"}
        onClick={() => deleteEvent(event)}
      >
        DELETE EVENT
      </Button>
    </>
  );
};
