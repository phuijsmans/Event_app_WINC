import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Button,
  Checkbox,
  CheckboxGroup,
  Stack,
  Text,
  filter,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { CategoryContext } from "../Contexts";
import { EventCardsList } from "../EventCardsList";

export const SearchFilterCategories = ({ events }) => {
  const categories = useContext(CategoryContext);
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterEvents, setFilterEvents] = useState([]);

  const test = () => {
    console.log("filter these categories: ");
    console.log(filterCategory);

    if (filterCategory.length === 0) {
      setFilterEvents(events);
    } else {
      setFilterEvents([]);
      events.forEach((event) => {
        filterCategory.forEach((category) => {
          if (
            JSON.stringify(event.categoryIds).includes(JSON.stringify(category))
          ) {
            console.log(event.title);
            setFilterEvents([...filterEvents, event]);
          }
        });
        // if (
        //   JSON.stringify(event.categoryIds) === JSON.stringify(filterCategory)
        // ) {
        //   console.log(event.title);
        //   setFilterEvents(event);
        // }
      });
      // setFilterEvents();
      // events.filter((event) => {
      //   JSON.stringify(event.categoryIds).includes(
      //     JSON.stringify(filterCategory)
      //   );
      // })
    }
    console.log(filterEvents);

    // const result = events.filter((event) =>
    //   event.categoryIds.includes(filterCategory)
    // );
  };

  const matchedCategory = events.filter((object) => {
    if (filterCategory.length === 0) {
      return object;
    }
    return JSON.stringify(object.categoryIds.sort()).includes(
      JSON.stringify(filterCategory.sort())
    );
  });

  const handleCheckbox = (isChecked, categoryId) => {
    if (isChecked) {
      setFilterCategory([...filterCategory, categoryId]);
    } else {
      setFilterCategory(filterCategory.filter((id) => id !== categoryId));
    }
  };

  return (
    <>
      <Text>Search Category</Text>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>Categories</AccordionButton>
          <AccordionPanel>
            <Stack direction={"column"}>
              <CheckboxGroup>
                {categories.map((category) => (
                  <Checkbox
                    key={category.id}
                    onChange={(e) =>
                      handleCheckbox(e.target.checked, category.id)
                    }
                  >
                    {category.name}
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </Stack>
            <Button onClick={test}>Test</Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <EventCardsList events={matchedCategory} categories={categories} />
    </>
  );
};
