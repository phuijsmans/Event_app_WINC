import { Tag } from "@chakra-ui/react";

export const ShowCategoriesLabels = ({ categoryIds, categories }) => {
  return (
    <>
      {categoryIds.map((categoryId) => (
        <Tag key={categoryId}>{categories[categoryId - 1].name}</Tag>
      ))}
    </>
  );
};
