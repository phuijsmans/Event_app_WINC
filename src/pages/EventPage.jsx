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

export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);

  return { event: await event.json() };
};

export const EventPage = () => {
  const { event } = useLoaderData();
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
        <CardFooter></CardFooter>
      </Card>
    </>
  );
};
