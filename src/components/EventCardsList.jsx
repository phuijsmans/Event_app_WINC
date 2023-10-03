import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
  Tag,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ShowDateAndTime } from "./showData/ShowDateAndTime";

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
          <Card key={event.id} w={300} bg={"blue.300"}>
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
                Start: <ShowDateAndTime date={event.startTime} /> - End:
                <ShowDateAndTime date={event.endTime} />
              </Text>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </Flex>
  );
};
