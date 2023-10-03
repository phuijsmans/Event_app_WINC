import { Input, Text } from "@chakra-ui/react";
import { useState, useContext } from "react";
import { EventsContext } from "../Contexts";
import { SearchFilterCategories } from "./SearchFilterCategories";

export const SearchEvent = () => {
  const events = useContext(EventsContext);

  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const matchedEvents = events.filter((object) => {
    const searchToLowerCase = search.toLowerCase();
    return object.title.toLowerCase().includes(searchToLowerCase);
  });

  return (
    <>
      <Text>Search Event</Text>
      <Input type="text" onChange={handleSearch}></Input>
      <SearchFilterCategories events={matchedEvents} />
    </>
  );
};
