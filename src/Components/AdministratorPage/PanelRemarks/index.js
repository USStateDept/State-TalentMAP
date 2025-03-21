export const validateInsertions = (text, insertionsList) => {
  // extract all substrings in the format {texthere}
  const matches = text.match(/{(.*?)}/g) || []; // Match all substrings in curly braces

  // remove the curly braces and check if each exists in insertions
  const missingInsertions = matches
    .map(match => match.slice(1, -1))
    .filter(substring => !insertionsList.some(insertion => insertion.riinsertiontext === substring));

  return missingInsertions;
};

export { default } from './PanelRemarks';
