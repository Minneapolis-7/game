// https://stackoverflow.com/a/69013604/718630
const uniqueBy = <T>(uniqueKey: keyof T, objects: T[]): T[] => {
  const ids = objects.map((object) => object[uniqueKey]);

  return objects.filter((object, index) => !ids.includes(object[uniqueKey], index + 1));
};

export default uniqueBy;
