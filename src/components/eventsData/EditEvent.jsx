import { EventForm } from "../ui/forms/EventForm";

export const EditEvent = ({ event, clickFn }) => {
  return (
    <>
      <EventForm
        textButton={"EDIT EVENT"}
        event={event}
        method={"PATCH"}
        clickFn={clickFn}
      />
    </>
  );
};
