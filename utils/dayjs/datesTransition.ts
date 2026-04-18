import dayjs from "./dayjs";

export interface IDatesTransitionOpts {
  format: string;
}

export function datesTransition(
  currDate: string | Date,
  prevDate: string | Date | undefined,
  options: IDatesTransitionOpts = { format: "YYYY-MM-DD" }
): string | undefined {
  const curr = dayjs(currDate);
  if (!prevDate) {
    return;
  }

  const prev = dayjs(prevDate);

  const isTransit = curr.format("YYYY-MM-DD") !== prev.format("YYYY-MM-DD");

  return isTransit ? curr.format(options.format) : undefined;
}
