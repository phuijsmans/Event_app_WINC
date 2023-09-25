import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Button,
  Checkbox,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { CategoryContext, FilteredCategoriesContext } from "../Contexts";

export const SearchFilterCategories = ({ events }) => {
  const categories = useContext(CategoryContext);
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterEvents, setFilterEvents] = useState(events);

  const test = () => {
    console.log("filter these categories: " + filterCategory);

    // if (filterCategory.length === 0) {
    //   setFilterEvents(events);
    // } else {
    //   setFilterEvents(
    //     events.filter((event) => {
    //       JSON.stringify(event.categoryIds).includes(
    //         JSON.stringify(filterCategory)
    //       );
    //     })
    //   );
    // }

    const result = events.filter((event) =>
      event.categoryIds.includes(filterCategory)
    );

    return result;
  };

  const handleCheckbox = (isChecked, categoryId) => {
    if (isChecked) {
      setFilterCategory([...filterCategory, categoryId]);
    } else {
      setFilterCategory(filterCategory.filter((id) => id !== categoryId));
    }
  };

  return (
    <>
      <Text>FilterFunction</Text>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>Categories</AccordionButton>
          <AccordionPanel>
            <Stack direction={"column"}>
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
            </Stack>
            <Button onClick={test}>Test</Button>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
