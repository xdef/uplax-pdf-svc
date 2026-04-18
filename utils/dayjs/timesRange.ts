import dayjs from "./dayjs";

const DELIMITER = " — ";

const timesRange = (date1: string, date2: string, format = "HH:mm"): string => {
  const from = dayjs(date1);
  const to = dayjs(date2);

  return `${from.format("HH:mm")}${DELIMITER}${to.format(format)}`;
};

export { timesRange };
