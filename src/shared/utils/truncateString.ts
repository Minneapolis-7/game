export default function truncateString(string = '', maxLength = 50) {
  if (string.length > maxLength) {
    return `${string.substring(0, maxLength)}…`;
  }

  return string;
}
