import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Text,
  Input,
  Textarea,
  Select,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Checkbox,
  Stack,
  CheckboxGroup,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Form, redirect } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = Object.fromEntries(await request.formData());
  let transformFormData = formData;
  transformFormData.createdBy = Number(formData.createdBy);
  const getCategoryIds = formData.categoryIds.split(",");
  transformFormData.categoryIds = returnNumberArray(getCategoryIds);
  if (transformFormData.categoryIds.length <= 1) {
    return redirect(`/`);
  }
  const newId = await fetch("http://localhost:3000/events", {
    method: "POST",
    body: JSON.stringify(transformFormData),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((json) => json.id);
  return redirect(`/event/${newId}`);
};

const returnNumberArray = (array) => {
  let forcedToNumberArray = [];
  array.forEach((str) => {
    forcedToNumberArray.push(Number(str));
  });
  return forcedToNumberArray;
};

export const AddEventForm = ({ users, categories }) => {
  const [checkSelectCategories, setCheckSelectCategories] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCategories, setSelectedCategories] = useState([]);

  const changeSelectedCategories = (isChecked, categoryId) => {
    if (isChecked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    }
  };

  useEffect(() => {
    if (selectedCategories.length === 0) {
      setCheckSelectCategories(true);
    } else {
      setCheckSelectCategories(false);
    }
  });

  return (
    <>
      <Button id="add-event-form-btn" onClick={onOpen} bg={"blue.200"}>
        Add event
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent p={"2em"}>
          <ModalHeader>Add event details</ModalHeader>
          <Form id="AddEventForm" className="new-event" method="POST">
            <Stack direction={"column"} gap=".5em">
              <Box>
                <Text>Title:</Text>
                <Input type="text" name="title" isRequired={true} />
              </Box>
              <Box>
                <Text>ImageURL:</Text>
                <Input type="text" name="image" isRequired={true}></Input>
              </Box>
              <Box>
                <Text>Description:</Text>
                <Textarea name="description" isRequired={true} />
              </Box>
              <Box>
                <Text>Selected categories:</Text>
                <Input
                  type="hidden"
                  name="categoryIds"
                  value={selectedCategories}
                  isReadOnly={true}
                ></Input>
                <Stack direction={"row"}>
                  {checkSelectCategories && (
                    <Text color={"red"}>requires at least 1 category!!!</Text>
                  )}
                  {selectedCategories && (
                    <>
                      {selectedCategories.map((categoryId) => {
                        return (
                          <Text key={categoryId}>
                            {categories[categoryId - 1].name}
                          </Text>
                        );
                      })}
                    </>
                  )}
                </Stack>
                <Accordion allowToggle>
                  <AccordionItem>
                    <AccordionButton>Select categories</AccordionButton>
                    <AccordionPanel>
                      <Stack>
                        <CheckboxGroup>
                          {categories.map((category) => {
                            return (
                              <Checkbox
                                key={category.id}
                                onChange={(e) =>
                                  changeSelectedCategories(
                                    e.target.checked,
                                    category.id,
                                    selectedCategories
                                  )
                                }
                              >
                                {category.name}
                              </Checkbox>
                            );
                          })}
                        </CheckboxGroup>
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </Box>
              <Box>
                <Text>Location:</Text>
                <Input type="text" name="location" isRequired={true}></Input>
              </Box>
              <Box>
                <Text>Start time:</Text>
                <Input
                  type="datetime-local"
                  name="startTime"
                  isRequired={true}
                />
              </Box>
              <Box>
                <Text>End time:</Text>
                <Input type="datetime-local" name="endTime" isRequired={true} />
              </Box>
              <Box>
                <Text>User:</Text>
                <Select name="createdBy">
                  {users.map((user) => {
                    return (
                      <option key={user.id} type="number" value={user.id}>
                        {user.name}
                      </option>
                    );
                  })}
                </Select>
              </Box>
              <Button type="submit">Post event!</Button>
            </Stack>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
};
