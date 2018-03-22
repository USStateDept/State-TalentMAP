// create a custom description based on the filter type
export function getFilterCustomDescription(filterItem, filterItemObject) {
  if (filterItem.item.description === 'region') {
    return `${filterItemObject.long_description} (${filterItemObject.short_description})`;
  } else if (filterItem.item.description === 'skill') {
    return `${filterItemObject.description} (${filterItemObject.code})`;
  } else if (filterItem.item.description === 'post') {
    return filterItemObject.location;
  }
  return false;
}

// our standard method for getting a pill description
export function getPillDescription(filterItemObject) {
  return filterItemObject.short_description ||
  filterItemObject.description ||
  filterItemObject.long_description ||
  filterItemObject.code ||
  '';
}

// when getting pill descriptions for posts or missions, perform alternate method
export function getPostOrMissionDescription(data) {
  if (data.type === 'post') {
    return `${data.location} (Post)`;
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
    description === 'postDiff' ||
    description === 'dangerPay' ||
    description === 'domestic' ||
    description === 'available'
  ) {
    return true;
  }
  return false;
}
