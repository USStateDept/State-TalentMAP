export default function routerLocations(state = [], action) {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return [...state, action.payload];
    default:
      return state;
  }
}
