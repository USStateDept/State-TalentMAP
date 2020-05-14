// eslint-disable-next-line import/prefer-default-export
export function fetchFeatureFlagsDataSuccess(state = '', action) {
  switch (action.type) {
    case 'FEATURE_FLAGS_DATA_SUCCESS':
      return action.data;
    default:
      return state;
  }
}
