export function getTimeIn12HourFormat(epoch: number): string {
  return new Date(epoch).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true
  });
}
