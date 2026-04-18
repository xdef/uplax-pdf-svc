import dayjs from "./dayjs";

const input = (value: Date | undefined): Date => {
  if (!value) {
    return new Date();
  }

  return value;
};

const output = (value: Date | null): Date | null => {
  if (!value) {
    return null;
  }

  return dayjs(value).toDate();
};

export const dateTransformer = { input, output };
