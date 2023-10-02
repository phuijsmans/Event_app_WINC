import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

import { useLoaderData } from "react-router-dom";
import { DeleteEvent } from "../components/eventsData/DeleteEvent";
import { EditEvent } from "../components/eventsData/EditEvent";
import { CategoryContext, UsersContext } from "../components/Contexts";

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
      <Heading>Event</Heading>
      <Card bg={"blue.200"}>
        <CardBody>
          <CardHeader>{event.title}</CardHeader>
          <CardBody>
            <Image src={event.image} h={"10em"} />
            <Text>{event.description}</Text>
          </CardBody>
        </CardBody>
        <CardFooter>
          <CategoryContext.Provider value={categories}>
            <UsersContext.Provider value={users}>
              <EditEvent event={event} />
            </UsersContext.Provider>
          </CategoryContext.Provider>
          <DeleteEvent event={event} />
        </CardFooter>
      </Card>
    </>
  );
};
