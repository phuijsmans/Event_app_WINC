import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ShowDateAndTime } from "./ui/ShowDateAndTime";

export const EventCardBasic = ({ events, categories }) => {
  return (
    <Stack direction={["column", "row"]} spacing={"1em"}>
      {events.map((event) => (
        <Link key={event.id} to={`/event/${event.id}`}>
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
                Start: <ShowDateAndTime date={event.startTime} /> - End:
                <ShowDateAndTime date={event.endTime} />
              </Text>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </Stack>
  );
};
