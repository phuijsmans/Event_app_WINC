import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
  Tag,
  Text,
  Flex,
  Stack,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ShowDateAndTime } from "./showData/ShowDateAndTime";
import { ShowCategoriesLabels } from "./showData/ShowCategoriesLabels";

export const EventCardsList = ({ events, categories }) => {
  return (
    <Flex
      gap={"2em"}
      flexWrap="wrap"
      flexDir={"row"}
      justify="center"
      alignItems="center"
      p={"2em"}
    >
      {events.map((event) => (
        <Link key={event.id} to={`/event/${event.id}`}>
          <Card key={event.id} w={300} bg={"blue.300"} overflow={"hidden"}>
            <Image src={event.image} w={"100%"} h={175} />
            <CardBody align={"center"}>
              <Stack>
                <CardHeader>{event.title}</CardHeader>
                <Text>{event.description}</Text>
                <Flex gap={"1em"} justify={"center"}>
                  <ShowCategoriesLabels
                    categoryIds={event.categoryIds}
                    categories={categories}
                  />
                </Flex>
              </Stack>
            </CardBody>
            <CardFooter justify={"center"}>
              <Stack align="center" direction="column">
                <Text>Start: </Text>
                <ShowDateAndTime date={event.startTime} />
                <Text>End:</Text>
                <ShowDateAndTime date={event.endTime} />
              </Stack>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};
