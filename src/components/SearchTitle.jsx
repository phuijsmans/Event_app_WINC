import { Button, Input } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { EventsContext, CategoryContext } from "./Contexts";
import { EventCardBasic } from "./EventCardBasic";

export const SearchTitle = () => {
  const events = useContext(EventsContext);
  const categories = useContext(CategoryContext);
  const [search, setSearch] = useState();
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const test = (text) => {
    if (text === undefined || text === null) {
      console.log("Empty");
    } else {
      console.log(text);
    }
  };

  const matchedEvents = events.filter((object) => {
    const searchToLowerCase = search.toLowerCase();
    return object.title.toLowerCase().includes(searchToLowerCase);
  });

  return (
    <>
      <Input onChange={handleChange}></Input>
      <Button onClick={() => test(matchedEvents)}>Test</Button>
      <EventCardBasic events={matchedEvents} categories={categories} />
    </>
  );
};
