import dayjs from "./dayjs";

export const dateTimeOfMessage = (date: Date | string): string => {
  const now = dayjs();
  const current = dayjs(date);

  if (current.format("L") === now.format("L")) {
    return current.format("HH:mm");
  }

  if (current.week() === now.week()) {
    return current.format("dd");
  }

  return dayjs(date).format("L");
};
