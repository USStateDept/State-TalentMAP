const descriptionSort = (a, b) => {
  const A = a.item.description.toLowerCase();
  const B = b.item.description.toLowerCase();
  if (A < B) { // sort string ascending
    return -1;
  }
  if (A > B) { return 1; }
  return 0; // default return value (no sorting)
};

export default descriptionSort;
