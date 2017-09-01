export const titleSort = (a, b) => {
  const A = a.title.toLowerCase();
  const B = b.title.toLowerCase();
  if (A < B) { // sort string ascending
    return -1;
  }
  if (A > B) { return 1; }
  return 0; // default return value (no sorting)
};

export const descriptionSort = (a, b) => {
  const A = a.description.toLowerCase();
  const B = b.description.toLowerCase();
  if (A < B) { // sort string ascending
    return -1;
  }
  if (A > B) { return 1; }
  return 0; // default return value (no sorting)
};
