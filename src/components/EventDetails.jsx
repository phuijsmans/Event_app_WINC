import React, { useEffect, useState } from "react";
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
import { SendRequest } from "./RequestData/SendRequest";

export const EventDetails = ({ event, categories, users }) => {
  const [eventDetails, setEventDetails] = useState(event);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/events/${event.id}`);
      const json = await response.json();
      setEventDetails(json);
      // console.log(json);
    };
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(`http://localhost:3000/events/${event.id}`);
    const json = await response.json();
    setEventDetails(json);
    // console.log(eventDetails);
  };

  return (
    <>
      <Flex flexWrap="wrap" flexDir={"row"} justify="center">
        <Card
          bg={"blue.300"}
          w={"2xl"}
          overflow={"hidden"}
          m={{ base: "0em", sm: "4em" }}
        >
          <Image src={eventDetails.image} h={"10em"} alt="Image of event" />
          <CardBody>
            <Stack align={"center"}>
              <CardHeader fontSize={{ base: "1.5em", md: "2.5em" }}>
                {eventDetails.title}
              </CardHeader>

              <Text>{eventDetails.description}</Text>
              <Flex gap="1em" wrap="wrap" justify={"center"}>
                <ShowCategoriesLabels
                  categoryIds={eventDetails.categoryIds}
                  categories={categories}
                />
              </Flex>
              <Text>Start of event: </Text>
              <ShowDateAndTime date={eventDetails.startTime}></ShowDateAndTime>
              <Text>End of event:</Text>
              <ShowDateAndTime date={eventDetails.endTime}></ShowDateAndTime>
              <Text>Organized by {users[eventDetails.createdBy - 1].name}</Text>
            </Stack>
          </CardBody>
          <CardFooter justify="center">
            <Stack gap="1em" direction={{ base: "column", sm: "row" }}>
              <CategoryContext.Provider value={categories}>
                <UsersContext.Provider value={users}>
                  <EditEvent event={event} clickFn={fetchData} />
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
