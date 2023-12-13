import dayjs from "dayjs";

const formatDate = (date: string, format: string) => {
  return dayjs(date).format(format);
};

const getDayToNow = (date: string) => {
  const dateRef = dayjs(date);
  const dateNow = new Date().toISOString();
  return dateRef.diff(dateNow, "day");
};

export { formatDate, getDayToNow };
