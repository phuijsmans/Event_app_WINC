import { Button, Input } from "@chakra-ui/react";
import { useState, useContext } from "react";
import {
  EventsContext,
  CategoryContext,
  FilteredCategoriesContext,
} from "../Contexts";
import { EventCardsList } from "../EventCardsList";
import { SearchFilterCategories } from "./SearchFilterCategories";

export const SearchEvent = () => {
  const events = useContext(EventsContext);
  const categories = useContext(CategoryContext);
  const filteredCategories = useContext(FilteredCategoriesContext);
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const test = (text) => {
    if (text === undefined || text === null) {
      console.log("Empty");
    } else {
      console.log(text);
      console.log(filteredCategories);
    }
  };

  const matchedEvents = events.filter((object) => {
    const searchToLowerCase = search.toLowerCase();
    return object.title.toLowerCase().includes(searchToLowerCase);
  });

  return (
    <>
      <Input type="text" onChange={handleSearch}></Input>
      <SearchFilterCategories events={matchedEvents} />
      <Button onClick={() => test(matchedEvents)}>Test</Button>
      <FilteredCategoriesContext.Provider value={filteredCategories}>
        <EventCardsList
          events={matchedEvents}
          categories={categories}
          filteredCategories={filteredCategories}
        />
      </FilteredCategoriesContext.Provider>
    </>
  );
};
