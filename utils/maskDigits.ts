export function maskDigits(
  number: string | number,
  startIndex: number,
  count: number
): string {
  const numStr = number.toString();
  return (
    numStr.slice(0, startIndex) +
    "*".repeat(count) +
    numStr.slice(startIndex + count)
  );
}