import { batch } from 'react-redux';
import { get } from 'lodash';
import api from '../api';

export function featureFlagsHasErrored(bool) {
  // eslint-disable-next-line no-console
  console.log('current: in featureFlagsHasErrored', bool);
  return {
    type: 'FEATURE_FLAGS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function featureFlagsIsLoading(bool) {
  // eslint-disable-next-line no-console
  console.log('current: in featureFlagsIsLoading', bool);
  return {
    type: 'FEATURE_FLAGS_IS_LOADING',
    isLoading: bool,
  };
}

export function fetchFeatureFlagsDataSuccess(data) {
  // eslint-disable-next-line no-console
  console.log('current: in fetchFeatureFlagsDataSuccess', data);
  return {
    type: 'FEATURE_FLAGS_DATA_SUCCESS',
    data,
  };
}

export function featureFlagsPostHasErrored(bool) {
  // eslint-disable-next-line no-console
  console.log('current: in featureFlagsPostHasErrored', bool);
  return {
    type: 'FEATURE_FLAGS_POST_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function featureFlagsPostIsLoading(bool) {
  // eslint-disable-next-line no-console
  console.log('current: in featureFlagsPostIsLoading', bool);
  return {
    type: 'FEATURE_FLAGS_POST_IS_LOADING',
    isLoading: bool,
  };
}

export function featureFlagsPostSuccess(success) {
  // eslint-disable-next-line no-console
  console.log('current: in featureFlagsPostSuccess', success);
  return {
    type: 'FEATURE_FLAGS_POST_SUCCESS',
    success,
  };
}

export function fetchFeatureFlagsData() {
  // eslint-disable-next-line no-console
  console.log('current: in getFeatureFlagsData');
  return (dispatch) => {
    dispatch(featureFlagsIsLoading(true));
    api().get('/featureflags/')
      .then((response) => {
        const featureFlagsData = JSON.parse(get(response, 'data', ''));
        batch(() => {
          dispatch(featureFlagsHasErrored(false));
          dispatch(featureFlagsIsLoading(false));
          dispatch(fetchFeatureFlagsDataSuccess(featureFlagsData));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(featureFlagsHasErrored(true));
          dispatch(featureFlagsIsLoading(false));
        });
      });
  };
}

export function postFeatureFlagsData(data) {
  return (dispatch) => {
    dispatch(featureFlagsPostIsLoading(true));
    api().post('/featureflags/', data)
      .then(() => {
        batch(() => {
          dispatch(featureFlagsPostIsLoading(false));
          dispatch(featureFlagsPostHasErrored(false));
          dispatch(featureFlagsPostSuccess(true));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(featureFlagsPostIsLoading(false));
          dispatch(featureFlagsPostHasErrored(true));
          dispatch(featureFlagsPostSuccess(false));
        });
      });
  };
}

