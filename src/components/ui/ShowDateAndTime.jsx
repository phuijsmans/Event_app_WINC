export const ShowDateAndTime = ({ date }) => {
  const getDateAndTime = (date) => {
    const getDate = date.slice(0, 10);
    const getTime = date.slice(11, 16);

    return [getDate, getTime];
  };

  return <>{getDateAndTime(date)}</>;
};
