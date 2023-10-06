import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
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
  useToast,
  CheckboxGroup,
  Box,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { FormButton } from "../FormButton";
import { CategoryContext, UsersContext } from "../../Contexts";
import { SendRequest } from "../../RequestData/SendRequest";

export const EventForm = ({ textButton, event, method }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const categories = useContext(CategoryContext);
  const users = useContext(UsersContext);
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

  const toast = useToast();
  const [checkSelectCategories, setCheckSelectCategories] = useState(true);

  const handleSubmit = async (e) => {
    const data = new FormData(e.target);
    const formObject = Object.fromEntries(data.entries());
    if (formObject.categoryIds.length > 0) {
      SendRequest({ method }, formObject, `events/${formObject.id}`);
      toast({
        title: `Event succesfully edited`,
        description: `Event has succesfully been edited, please refresh with the refresh button.`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose();
      setSelectedCategories([]);
    } else {
      toast({
        title: `Event failed to edit`,
        description: `Fill all fields please`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const resetForm = () => {
    onClose();
    setSelectedCategories([]);
  };

  return (
    <>
      <FormButton textButton={textButton} clickFn={onOpen} />
      <Modal isOpen={isOpen} onClose={resetForm} size={"3xl"}>
        <ModalOverlay />
        <ModalContent p={"2em"}>
          <Form
            id="EditEventForm"
            className="new-event"
            onSubmit={handleSubmit}
          >
            <Stack direction={"column"} gap="1em">
              <Box>
                <Text>Title:</Text>
                <Input type="text" name="title" defaultValue={event.title} />
              </Box>
              <Box>
                <Text>ImageURL:</Text>
                <Input
                  type="text"
                  name="image"
                  defaultValue={event.image}
                ></Input>
              </Box>
              <Box>
                <Text>Description:</Text>
                <Textarea name="description" defaultValue={event.description} />
              </Box>
              <Box>
                <Text>Selected categories:</Text>
                <Input
                  type="hidden"
                  name="categoryIds"
                  defaultValue={selectedCategories}
                  isReadOnly={true}
                ></Input>
              </Box>
              <Box>
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
                                id={category.name}
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
                <Input
                  type="text"
                  name="location"
                  defaultValue={event.location}
                ></Input>
              </Box>
              <Box>
                <Text>Start time:</Text>
                <Input
                  type="datetime-local"
                  name="startTime"
                  defaultValue={event.startTime}
                />
              </Box>
              <Box>
                <Text>End time:</Text>
                <Input
                  type="datetime-local"
                  name="endTime"
                  defaultValue={event.endTime}
                />
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
                <Input
                  hidden={true}
                  isReadOnly={true}
                  value={event.id}
                  type="number"
                  name="id"
                />
              </Box>
              <Button type="submit">{textButton}</Button>
            </Stack>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
};
