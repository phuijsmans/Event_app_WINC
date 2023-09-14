import { Button, Input } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { EventsContext } from "./Contexts";

export const SearchTitle = () => {
  const events = useContext(EventsContext);
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
    return object.title.toLowerCase().includes(search);
  });

  return (
    <>
      <Input onChange={handleChange}></Input>
      <Button onClick={() => test(matchedEvents)}>Test</Button>
    </>
  );
};
