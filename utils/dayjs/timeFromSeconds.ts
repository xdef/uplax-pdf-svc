export const timeFromSeconds = (seconds: number): string => {
  const value = Math.floor(seconds);

  const h = Math.floor(value / 3600);
  const m = Math.floor(value / 60) % 60;
  const s = value % 60;

  return [h, m, s]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};
