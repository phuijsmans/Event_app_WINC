import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Checkbox,
  CheckboxGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { CategoryContext } from "../Contexts";
import { EventCardsList } from "../EventCardsList";

export const SearchFilterCategories = ({ events }) => {
  const categories = useContext(CategoryContext);
  const [filterCategory, setFilterCategory] = useState([]);

  const hasOneCategory = (object, filterCategory) => {
    for (const category of object.categoryIds) {
      if (category === filterCategory[0]) {
        return true;
      }
    }
    return false;
  };

  const hasMultipleCategories = (object, filterCategories) => {
    let amountCorrect = 0;
    for (const category of object.categoryIds) {
      for (const filterCategory of filterCategories) {
        if (category === filterCategory) {
          amountCorrect++;
          break;
        }
      }
    }
    return amountCorrect === filterCategories.length;
  };

  const matchedCategory = events.filter((object) => {
    if (filterCategory.length === 0) {
      return object;
    }
    if (filterCategory.length === 1) {
      if (hasOneCategory(object, filterCategory)) {
        return object;
      }
    }
    if (filterCategory.length > 1) {
      if (hasMultipleCategories(object, filterCategory)) {
        return object;
      }
    }
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
      <Stack align={"center"}>
        <Text>Search Category</Text>
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton
              bg={"blue.200"}
              _focus={{ bg: "blue.100" }}
              _expanded={{ bg: "blue.300" }}
            >
              Categories
            </AccordionButton>
            <AccordionPanel>
              <Stack direction={"column"}>
                <CheckboxGroup>
                  {categories.map((category) => (
                    <Checkbox
                      key={category.id}
                      id={category.name}
                      onChange={(e) =>
                        handleCheckbox(e.target.checked, category.id)
                      }
                    >
                      {category.name}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
      <EventCardsList events={matchedCategory} categories={categories} />
    </>
  );
};
