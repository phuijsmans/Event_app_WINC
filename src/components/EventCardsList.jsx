import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
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
      p={{ base: "0em", sm: "2em" }}
    >
      {events.map((event) => (
        <Link key={event.id} to={`/event/${event.id}`}>
          <Card key={event.id} w={300} bg={"blue.300"} overflow={"hidden"}>
            <Image src={event.image} w={"100%"} h={175} />
            <CardBody align={"center"}>
              <Stack>
                <CardHeader fontSize={"1.4em"}>{event.title}</CardHeader>
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
              <Stack direction="column">
                <Box align="center">
                  <Text>Start: </Text>
                  <ShowDateAndTime date={event.startTime} />
                </Box>
                <Box align="center">
                  <Text>End:</Text>
                  <ShowDateAndTime date={event.endTime} />
                </Box>
              </Stack>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};
