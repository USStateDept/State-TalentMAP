export const validateInsertions = (text, insertionsList) => {
  // extract all substrings in the format {texthere}
  const matches = text.match(/{(.*?)}/g) || []; // Match all substrings in curly braces

  // check if each substring exists in insertionsList
  let missingInsertions = matches
    .filter(substring => !insertionsList.some(insertion => insertion.riinsertiontext === substring));

  // check if all inserts have been removed
  if (insertionsList.length > 0 && missingInsertions.length === 0) {
    missingInsertions = insertionsList.map(insertion => insertion.riinsertiontext);
  }

  return missingInsertions;
};

export { default } from './PanelRemarks';
