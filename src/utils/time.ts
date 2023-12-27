import dayjs from "dayjs";

const formatDate = (date: string, format: string) => {
  return dayjs(date).format(format);
};

const getDayToNow = (date: string) => {
  const dateRef = dayjs(date);
  const dateNow = new Date().toISOString();
  return dateRef.diff(dateNow, "day");
};

const getDateNextHour = (addHour: number) => {
  const current = dayjs();
  return current.add(addHour, "hour").toDate();
};

const getDueDateTime = (endDate: string, endTime: string) => {
  const current = dayjs(endDate);
  const [endHour, endMinute] = endTime.split(":");

  const endTimeInMinutes = Number(endHour) * 60 + Number(endMinute);
  return current.add(endTimeInMinutes, "minute").toISOString();
};

export { formatDate, getDayToNow, getDateNextHour, getDueDateTime };
