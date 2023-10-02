import { Button } from "@chakra-ui/react";

export const FormButton = ({ textButton, clickFn }) => {
  return (
    <>
      <Button onClick={() => clickFn()}>{textButton}</Button>
    </>
  );
};
