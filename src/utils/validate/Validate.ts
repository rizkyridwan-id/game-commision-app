export const NumberOnly = (value: string) => {
  if (value) {
    return value.replace(/[^\d]/g, "");
  } else {
    return value;
  }
};
