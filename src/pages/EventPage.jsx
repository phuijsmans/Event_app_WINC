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
import { EventDetails } from "../components/EventDetails";

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
      <EventDetails event={event} categories={categories} users={users} />
    </>
  );
};
