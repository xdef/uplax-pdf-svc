import dayjs from "./dayjs";

interface IOptions {
  format?: string;
  datesDelimiter?: string;
  partsDelimiter?: string;
}

const DEFAULT_OPTIONS: Required<IOptions> = {
  format: "D MMM",
  datesDelimiter: " — ",
  partsDelimiter: " ⋅ ",
};

const datesRange = (date1: string, date2: string, options?: IOptions): string => {
  const { format, datesDelimiter, partsDelimiter } = { ...DEFAULT_OPTIONS, ...options };

  const from = dayjs(date1);
  const to = dayjs(date2);

  if (from.isSame(to)) {
    return from.format(format);
  }

  if (from.day() === to.day()) {
    return `${from.format(format)}${partsDelimiter}${from.format("HH:mm")}${datesDelimiter}${to.format("HH:mm")}`;
  }

  if (from.month() === to.month()) {
    return [from.format("D"), to.format(format)].join(datesDelimiter);
  }

  if (from.year() === to.year()) {
    const formatTo = format;
    const formatFrom = format.replace(/Y/g, "").trim();

    return [from.format(formatFrom), to.format(formatTo)].join(datesDelimiter);
  }

  return [from.format(format), to.format(format)].join(datesDelimiter);
};

export { datesRange };
