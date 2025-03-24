export const validateInsertions = (text, insertionsList) => {
  // extract all substrings in the format {texthere}
  const matches = text.match(/{(.*?)}/g) || []; // Match all substrings in curly braces

  // check if each substring exists in insertionsList
  const missingInsertions = matches
    .filter(substring => !insertionsList.some(insertion => insertion.riinsertiontext === substring));
  return missingInsertions;
};

export { default } from './PanelRemarks';
