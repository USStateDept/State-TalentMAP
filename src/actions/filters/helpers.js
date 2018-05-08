import { getPostName } from '../../utilities';

// Attempt to map the non-numeric grade codes to a full description.
// If no match is found, return the unmodified code.
export function getCustomGradeDescription(gradeCode) {
  switch (gradeCode) {
    case 'CM':
      return 'CM Career Minister (FE-CM)';
    case 'MC':
      return 'MC Minister-Counselor (FE-MC)';
    case 'OC':
      return 'OC Counselor (FE-OC)';
    case 'OM':
      return 'Office Manager (OM)';
    default:
      return gradeCode;
  }
}

// create a custom description based on the filter type
export function getFilterCustomDescription(filterItem, filterItemObject) {
  switch (filterItem.item.description) {
    case 'region':
      return `(${filterItemObject.short_description}) ${filterItemObject.long_description}`;
    case 'skill':
      return `${filterItemObject.description} (${filterItemObject.code})`;
    case 'post':
      return getPostName(filterItemObject);
    case 'bidCycle':
      return filterItemObject.name;
    case 'language':
      return `${filterItemObject.formal_description} (${filterItemObject.code})`;
    case 'grade':
      return getCustomGradeDescription(filterItemObject.code);
    case 'postDiff':
    case 'dangerPay':
    case 'functionalRegion':
      return filterItemObject.description;
    default:
      return false;
  }
}

// Our standard method for getting a pill description.
// Pass a customType string for special rendering.
export function getPillDescription(filterItemObject, customType) {
  switch (customType) {
    case 'dangerPay':
      return `Danger pay: ${filterItemObject.description}`;
    case 'postDiff':
      return `Post differential: ${filterItemObject.description}`;
    case 'language':
      return filterItemObject.custom_description;
    default:
      return filterItemObject.short_description ||
      filterItemObject.description ||
      filterItemObject.long_description ||
      filterItemObject.code ||
      filterItemObject.name ||
      '';
  }
}

// when getting pill descriptions for posts or missions, perform alternate method
export function getPostOrMissionDescription(data) {
  if (data.type === 'post') {
    return `${getPostName(data)} (Post)`;
  }
  return false;
}

export function doesCodeOrIdMatch(filterItem, filterItemObject, mappedObject) {
  const filterCode = filterItemObject.code;
  const filterRef = filterItem.item.selectionRef;
  const filterId = filterItemObject.id;

  const codeAndRefMatch = filterCode &&
    filterCode.toString() === mappedObject.codeRef.toString() &&
    filterRef === mappedObject.selectionRef;

  const idAndRefMatch = filterId &&
  filterItemObject.id.toString() === mappedObject.codeRef.toString() &&
  filterRef === mappedObject.selectionRef;

  if (codeAndRefMatch || idAndRefMatch) {
    return true;
  }
  return false;
}

export function isBooleanFilter(description) {
  if (
    description === 'COLA' ||
    description === 'available'
  ) {
    return true;
  }
  return false;
}

export function isPercentageFilter(description) {
  if (
    description === 'dangerPay' ||
    description === 'postDiff'
  ) {
    return true;
  }
  return false;
}
