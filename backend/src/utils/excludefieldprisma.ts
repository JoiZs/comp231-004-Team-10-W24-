export const excludeEntry = <Object>(obj: Object, exclude: string[]) =>
  Object.fromEntries(
    Object.entries(obj!).filter(([key]) => !exclude.includes(key))
  );
