import { EventForm } from "../ui/forms/EventForm";

export const EditEvent = ({ event }) => {
  return (
    <>
      <EventForm textButton={"EDIT EVENT"} event={event} method={"PATCH"} />
    </>
  );
};
