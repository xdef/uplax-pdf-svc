import { ITimestamp } from "@/types";

export function secondsToHMS(value: number): string {
  const total = Math.max(0, Math.floor(value));

  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

/**
 * Преобразует секунды start/end в массив человекочитаемых значений: ["HH:mm:ss", "HH:mm:ss"].
 */
export function humanTimestamp({ start, end }: ITimestamp): [string, string] {
  return [secondsToHMS(start), secondsToHMS(end)];
}

export default humanTimestamp;
