import React from "react";
import { Heading } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { AddEventForm } from "../components/AddEventForm";
import { SearchEvent } from "../components/SearchEvent";
import { EventsContext, CategoryContext } from "../components/Contexts";
export const loader = async () => {
  const events = await fetch(`http://localhost:3000/events`);
  const categories = await fetch(`http://localhost:3000/categories`);
  const users = await fetch(`http://localhost:3000/users`);

  return {
    events: await events.json(),
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const EventsPage = () => {
  const { events, categories, users } = useLoaderData();

  return (
    <>
      <Heading>List of events</Heading>

      <AddEventForm users={users} categories={categories} />
      <EventsContext.Provider value={events}>
        <CategoryContext.Provider value={categories}>
          <SearchEvent />
        </CategoryContext.Provider>
      </EventsContext.Provider>
    </>
  );
};
