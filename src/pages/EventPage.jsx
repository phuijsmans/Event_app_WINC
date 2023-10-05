import React from "react";

import { useLoaderData } from "react-router-dom";

import { EventDetails } from "../components/EventDetails";
import { Box } from "@chakra-ui/react";

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
      <Box h="100%">
        <EventDetails event={event} categories={categories} users={users} />
      </Box>
    </>
  );
};
