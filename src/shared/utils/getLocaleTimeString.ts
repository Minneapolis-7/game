interface DateTimeFormatOptionsWithMs extends Intl.DateTimeFormatOptions {
  ms?: 'numeric';
}

export default (
  value: string | number,
  format: DateTimeFormatOptionsWithMs = { minute: '2-digit', second: '2-digit' }
): string => {
  const date = new Date(value);
  const formattedDate = date.toLocaleTimeString([], format);

  if (format.ms) {
    const milliseconds = date.getMilliseconds();

    return `${formattedDate}:${milliseconds}`;
  }

  return formattedDate;
};
