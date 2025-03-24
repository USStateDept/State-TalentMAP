export const validateInsertions = (text, insertionsList) => {
  // extract all substrings in the format {texthere}
  const matches = text.match(/{(.*?)}/g) || []; // Match all substrings in curly braces
  let missingInsertions = [];

  // check if all inserts have been removed
  if (insertionsList.length > 0 && matches.length === 0) {
    missingInsertions = insertionsList.map(insertion => insertion.riinsertiontext);
  } else {
    // check if each substring exists in insertionsList
    missingInsertions = matches
      .filter(substring => !insertionsList.some(insertion => insertion.riinsertiontext === substring));
  }
  
  return missingInsertions;
};

export { default } from './PanelRemarks';
