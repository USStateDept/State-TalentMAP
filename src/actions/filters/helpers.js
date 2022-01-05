import { isUndefined } from 'lodash';
import { getPostName } from 'utilities';
import { COMMON_PROPERTIES } from 'Constants/EndpointParams';

// Mapping grade codes to a full description for clarity
// If no match is found, return the unmodified code.
export function getCustomGradeDescription(gradeCode) {
  switch (gradeCode) {
    case '00':
      return '00 (Multiple Grades Considered)';
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

function getLanguageNameByIfNull(filterItemObject = {}) {
  return filterItemObject.code === COMMON_PROPERTIES.NULL_LANGUAGE ?
    filterItemObject.customDescription || filterItemObject.formal_description
    :
    `${filterItemObject.formal_description} (${filterItemObject.code})`;
}

function getFuncRegionCustomDescription(shortDescription, longDescription) {
  return `(${shortDescription}) ${longDescription}`;
}

function getRegionCustomDescription(shortDescription, longDescription) {
  return `(${shortDescription}) ${longDescription}`;
}

function getSkillCustomDescription(description, code) {
  return `${description} (${code})`;
}

function getCommuterPostDescription(filterItemObject = {}) {
  return `${filterItemObject.description}`;
}

// create a custom description based on the filter type
// eslint-disable-next-line complexity
export function getFilterCustomDescription(filterItem, filterItemObject) {
  const { item: { description: descriptionPrimary } } = filterItem;
  const { short_description: shortDescription, long_description: longDescription, description,
    code, name } = filterItemObject;
  switch (descriptionPrimary) {
    case 'region':
    case 'region-tandem':
      return getRegionCustomDescription(shortDescription, longDescription);
    case 'functionalRegion':
    case 'functionalRegion-tandem':
      return getFuncRegionCustomDescription(shortDescription, longDescription);
    case 'skill':
    case 'skill-tandem':
      return getSkillCustomDescription(description, code);
    case 'post':
      return getPostName(filterItemObject);
    case 'bidCycle':
    case 'bidCycle-tandem':
      return name;
    case 'language':
    case 'language-tandem':
    // language code NONE gets displayed differently
      return getLanguageNameByIfNull(filterItemObject);
    case 'grade':
    case 'grade-tandem':
      return getCustomGradeDescription(code);
    case 'commuterPosts':
      return getCommuterPostDescription(filterItemObject);
    case 'postDiff': case 'dangerPay': case 'bidSeason':
      return description;
    default:
      return false;
  }
}

// create custom attributes based on the filter type
// eslint-disable-next-line complexity
export function getFilterCustomAttributes(filterItem, filterItemObject) {
  const { item: { description: descriptionPrimary } } = filterItem;
  const { code } = filterItemObject;
  switch (descriptionPrimary) {
    case 'language':
    case 'language-tandem':
      if (code === 'NLR') {
        return { group: 'no-language' };
      }
      return { group: 'languages' };
    default:
      break;
  }
  return null;
}

const getDefaultPillText = filterItemObject => (
  filterItemObject.short_description ||
  filterItemObject.description ||
  filterItemObject.long_description ||
  filterItemObject.code ||
  filterItemObject.name ||
  ''
);

// Our standard method for getting a pill description.
// Pass a customType string for special rendering.
export function getPillDescription(filterItemObject, customType) {
  const defaultText = getDefaultPillText(filterItemObject);
  switch (customType) {
    case 'dangerPay':
      return `Danger pay: ${filterItemObject.description}`;
    case 'postDiff':
      return `Post differential: ${filterItemObject.description}`;
    case 'language':
    case 'language-tandem':
      return filterItemObject.custom_description;
    default:
      return defaultText;
  }
}

// when getting pill descriptions for posts or missions, perform alternate method
export function getPostOrMissionDescription(data) {
  if (data.type === 'post') {
    return `${getPostName(data)}`;
  }
  return false;
}

export function doesCodeOrIdMatch(filterItem, filterItemObject, mappedObject) {
  const filterCode = filterItemObject.code;
  const filterRef = filterItem.item.selectionRef;
  const filterId = filterItemObject.id;

  const codeAndRefMatch = !isUndefined(filterCode) &&
    filterCode.toString() === mappedObject.codeRef.toString() &&
    filterRef === mappedObject.selectionRef;

  const idAndRefMatch = !isUndefined(filterId) &&
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
