import React from "react";
import {
  Heading,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  const events = await fetch(`http://localhost:3000/events`);
  const categories = await fetch(`http://localhost:3000/categories`);

  return { events: await events.json(), categories: await categories.json() };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();

  const getDateAndTime = (date) => {
    const getDate = date.slice(0, 10);
    const getTime = date.slice(11, 16);

    return [getDate, getTime];
  };

  return (
    <>
      <Heading>List of events</Heading>
      <Stack direction={["column", "row"]} spacing={"1em"}>
        {events.map((event) => (
          <Card key={event.id} w={300} bg={"blue.200"}>
            <CardHeader>{event.title}</CardHeader>
            <CardBody>
              {event.description}
              <Image src={event.image} w={200} h={125} />
              {event.categoryIds.map((id) => (
                <Tag key={id}>{categories[id - 1].name}</Tag>
              ))}
            </CardBody>
            <CardFooter>
              <Text>
                Start: {getDateAndTime(event.startTime)} - End:{" "}
                {getDateAndTime(event.endTime)}
              </Text>
            </CardFooter>
          </Card>
        ))}
      </Stack>
    </>
  );
};
