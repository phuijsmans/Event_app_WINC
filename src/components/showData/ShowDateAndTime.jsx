import { Flex, Text } from "@chakra-ui/react";

export const ShowDateAndTime = ({ date }) => {
  const getDateAndTime = (date) => {
    const getDate = date.slice(0, 10);
    const getTime = date.slice(11, 16);

    return (
      <Flex gap="1em">
        <Text>D: {getDate}</Text>
        <Text>T: {getTime}</Text>
      </Flex>
    );
  };

  return <>{getDateAndTime(date)}</>;
};
