import { useEffect, useState } from "react";
import { EventForm } from "../ui/forms/EventForm";

export const EditEvent = ({ event }) => {
  // const [formData, setFormData] = useState();

  // useEffect(() => {
  //   let editedFormData = formData;
  //   editedFormData.createdBy = Number(formData.createdBy);
  //   const getCategoryIds = formData.categoryIds.split(",");
  //   console.log(returnNumberArray(getCategoryIds));
  //   editedFormData.categoryIds = returnNumberArray(getCategoryIds);
  //   console.log(formData);
  // });

  // const test = (e) => {
  //   console.log("update event!");
  //   console.log(formData);
  //   console.log(e);
  // };

  return (
    <>
      <EventForm
        textButton={"EDIT EVENT"}
        event={event}
        // setFormData={setFormData}
        method={"PATCH"}
      />
    </>
  );
};
