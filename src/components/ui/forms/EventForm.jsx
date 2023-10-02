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
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { Form, redirect } from "react-router-dom";
import { FormButton } from "../FormButton";
import { CategoryContext, UsersContext } from "../../Contexts";
import { SendRequest } from "../../RequestData/SendRequest";

export const EventForm = ({ textButton, event, setFormData, method }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const categories = useContext(CategoryContext);
  const users = useContext(UsersContext);
  const [selectedCategories, setSelectedCategories] = useState(
    event.categoryIds
  );
  // console.log(selectedCategories);
  const changeSelectedCategories = (isChecked, categoryId) => {
    if (isChecked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    }
  };

  const handleSubmit = (e) => {
    console.log("handleSubmit");
    const data = new FormData(e.target);
    const formObject = Object.fromEntries(data.entries());
    //setFormData(formObject);
    console.log({ method }, formObject);
    SendRequest({ method }, formObject);
  };

  return (
    <>
      <FormButton textButton={textButton} clickFn={onOpen} />
      <Modal isOpen={isOpen} onClose={onClose} size={"3xl"}>
        <ModalOverlay />
        <ModalContent p={"2em"}>
          <Form className="new-event" onSubmit={handleSubmit}>
            <Text>Title:</Text>
            <Input type="text" name="title" defaultValue={event.title} />
            <Text>ImageURL:</Text>
            <Input type="text" name="image" defaultValue={event.image}></Input>
            <Text>Description:</Text>
            <Textarea name="description" defaultValue={event.description} />
            <Text>Selected categories:</Text>
            <Input
              type="hidden"
              name="categoryIds"
              defaultValue={selectedCategories}
              isReadOnly={true}
            ></Input>
            <Stack direction={"row"}>
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
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            <Text>Location:</Text>
            <Input
              type="text"
              name="location"
              defaultValue={event.location}
            ></Input>
            <Text>Start time:</Text>
            <Input
              type="datetime-local"
              name="startTime"
              defaultValue={event.startTime}
            />
            <Text>End time:</Text>
            <Input
              type="datetime-local"
              name="endTime"
              defaultValue={event.endTime}
            />
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
            <Button type="submit">{textButton}</Button>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
};
