import { Button, Input, Text } from "@chakra-ui/react";
import { useState, useContext } from "react";
import {
  EventsContext,
  // CategoryContext,
  FilteredCategoriesContext,
} from "../Contexts";
import { SearchFilterCategories } from "./SearchFilterCategories";

export const SearchEvent = () => {
  const events = useContext(EventsContext);
  // const categories = useContext(CategoryContext);
  const filteredCategories = useContext(FilteredCategoriesContext);
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // const test = (text) => {
  //   if (text === undefined || text === null) {
  //     console.log("Empty");
  //   } else {
  //     console.log(text);
  //     console.log(filteredCategories);
  //   }
  // };

  const matchedEvents = events.filter((object) => {
    const searchToLowerCase = search.toLowerCase();
    return object.title.toLowerCase().includes(searchToLowerCase);
  });

  // if (filterCategory.length === 0) {
  //   setFilterEvents(matchedEvents);
  // } else {
  //   events.forEach((event) => {
  //     if (
  //       JSON.stringify(event.categoryIds).includes(
  //         JSON.stringify(filterCategory)
  //       )
  //     ) {
  //       console.log(event.title);
  //     }
  //   });
  // }

  return (
    <>
      <Text>Search Event</Text>
      <Input type="text" onChange={handleSearch}></Input>
      {/* <SearchFilterCategories events={matchedEvents} /> */}
      {/* <Button onClick={() => test(matchedEvents)}>Test</Button> */}
      <FilteredCategoriesContext.Provider value={filteredCategories}>
        <SearchFilterCategories events={matchedEvents} />
        {/* <EventCardsList events={matchedEvents} categories={categories} /> */}
      </FilteredCategoriesContext.Provider>
    </>
  );
};
