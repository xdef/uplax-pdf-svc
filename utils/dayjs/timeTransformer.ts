import dayjs from "./dayjs";

const FORMAT = "HH:mm";

const input = (value: string | undefined): Date => {
  if (!value) {
    return new Date();
  }

  const parts: number[] = value.split(":").map((item) => Number(item));
  const [hours, minutes] = parts;

  return dayjs().set("hour", hours!).set("minutes", minutes!).toDate();
};

const output = (value: Date | string | undefined): string | undefined => {
  if (!value) {
    return dayjs().format(FORMAT);
  }

  return dayjs(value).format(FORMAT);
};

export const timeTransformer = { input, output };
