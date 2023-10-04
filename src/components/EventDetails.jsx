import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Text,
  Flex,
  Stack,
  Box,
} from "@chakra-ui/react";
import { ShowCategoriesLabels } from "../components/showData/ShowCategoriesLabels";
import { ShowDateAndTime } from "../components/showData/ShowDateAndTime";
import { CategoryContext, UsersContext } from "../components/Contexts";
import { DeleteEvent } from "../components/eventsData/DeleteEvent";
import { EditEvent } from "../components/eventsData/EditEvent";

export const EventDetails = ({ event, categories, users }) => {
  return (
    <>
      <Flex flexWrap="wrap" flexDir={"row"} justify="center">
        <Card
          bg={"blue.300"}
          w={"2xl"}
          overflow={"hidden"}
          m={{ base: "0em", sm: "4em" }}
        >
          <Image src={event.image} h={"10em"} alt="Image of event" />
          <CardBody>
            <Stack align={"center"}>
              <CardHeader fontSize={{ base: "1.5em", md: "2.5em" }}>
                {event.title}
              </CardHeader>

              <Text>{event.description}</Text>
              <Flex gap="1em" wrap="wrap" justify={"center"}>
                <ShowCategoriesLabels
                  categoryIds={event.categoryIds}
                  categories={categories}
                />
              </Flex>
              <Text>Start of event: </Text>
              <ShowDateAndTime date={event.startTime}></ShowDateAndTime>
              <Text>End of event:</Text>
              <ShowDateAndTime date={event.endTime}></ShowDateAndTime>
              <Text>Organized by {users[event.createdBy - 1].name}</Text>
            </Stack>
          </CardBody>
          <CardFooter justify="center">
            <Stack gap="1em" direction={{ base: "column", sm: "row" }}>
              <CategoryContext.Provider value={categories}>
                <UsersContext.Provider value={users}>
                  <EditEvent event={event} />
                </UsersContext.Provider>
              </CategoryContext.Provider>
              <DeleteEvent event={event} />
            </Stack>
          </CardFooter>
        </Card>
      </Flex>
    </>
  );
};
