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

import { useLoaderData } from "react-router-dom";
import { DeleteEvent } from "../components/eventsData/DeleteEvent";
import { EditEvent } from "../components/eventsData/EditEvent";
import { CategoryContext, UsersContext } from "../components/Contexts";
import { ShowCategoriesLabels } from "../components/showData/ShowCategoriesLabels";
import { ShowDateAndTime } from "../components/showData/ShowDateAndTime";

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch(`http://localhost:3000/categories`);
  const users = await fetch(`http://localhost:3000/users`);
  return {
    event: await event.json(),
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const EventPage = () => {
  const { event, categories, users } = useLoaderData();
  return (
    <>
      <Flex flexWrap="wrap" flexDir={"row"} justify="center">
        <Card bg={"blue.300"} w="2xl">
          <Image src={event.image} h={"10em"} alt="Image of event" />
          <CardBody>
            <Stack align={"center"}>
              <CardHeader fontSize={"2em"}>{event.title}</CardHeader>

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
            <Stack gap="1em" direction="row">
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
