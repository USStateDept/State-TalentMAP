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
  } else if (data.type === 'mission') {
    return `${data.short_name} (Mission)`;
  }
  return false;
}

export function doesCodeOrIdMatch(filterItem, filterItemObject, mappedObject) {
  if (
    (
      filterItemObject.code &&
      filterItemObject.code.toString() === mappedObject.codeRef.toString() &&
      filterItem.item.selectionRef === mappedObject.selectionRef
    )
    ||
    (
      filterItemObject.id &&
      filterItemObject.id.toString() === mappedObject.codeRef.toString() &&
      filterItem.item.selectionRef === mappedObject.selectionRef)
    ) {
    return true;
  }
  return false;
}

export function isBooleanFilter(description) {
  if (
    description === 'COLA' ||
    description === 'postDiff' ||
    description === 'dangerPay' ||
    description === 'domestic'
  ) {
    return true;
  }
  return false;
}
