// Attempt to map the non-numeric grade codes to a full description.
// If no match is found, return the unmodified code.
export function getCustomGradeDescription(gradeCode) {
  switch (gradeCode) {
    case 'CM':
      return 'CM Career Minister (FE-CM)';
    case 'MC':
      return 'MC Minister-Counselor (FE-MC)';
    case 'OC':
      return 'OC Couneslor (FE-OC)';
    case 'OM':
      return 'Office Manager (OM)';
    default:
      return gradeCode;
  }
}

// create a custom description based on the filter type
export function getFilterCustomDescription(filterItem, filterItemObject) {
  if (filterItem.item.description === 'region') {
    return `${filterItemObject.long_description} (${filterItemObject.short_description})`;
  } else if (filterItem.item.description === 'skill') {
    return `${filterItemObject.description} (${filterItemObject.code})`;
  } else if (filterItem.item.description === 'post') {
    return getPostName(filterItemObject);
  } else if (filterItem.item.description === 'bidCycle') {
    return filterItemObject.name;
  } else if (filterItem.item.description === 'postDiff') {
    return filterItemObject.description;
  } else if (filterItem.item.description === 'dangerPay') {
    return filterItemObject.description;
  } else if (filterItem.item.description === 'grade') {
    return getCustomGradeDescription(filterItemObject.code);
  }
  return false;
}

// Our standard method for getting a pill description.
// Pass a customType string for special rendering.
export function getPillDescription(filterItemObject, customType) {
  if (customType === 'dangerPay') {
    return `Danger Pay: ${filterItemObject.description}`;
  } else if (customType === 'postDiff') {
    return `Post Differential: ${filterItemObject.description}`;
  }
  return filterItemObject.short_description ||
    filterItemObject.description ||
    filterItemObject.long_description ||
    filterItemObject.code ||
    filterItemObject.name ||
    '';
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
