import { EventForm } from "../ui/forms/EventForm";

export const EditEvent = ({ event, submitted }) => {
  return (
    <>
      <EventForm
        textButton={"EDIT EVENT"}
        event={event}
        method={"PATCH"}
        submitted={submitted}
      />
    </>
  );
};
