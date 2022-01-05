import { batch } from 'react-redux';
import { get } from 'lodash';
import axios from 'axios';
import { getAssetPath } from 'utilities';
import { toastError, toastSuccess } from './toast';
import api from '../api';
import * as SystemMessages from '../Constants/SystemMessages';

export function featureFlagsHasErrored(bool) {
  return {
    type: 'FEATURE_FLAGS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function featureFlagsIsLoading(bool) {
  return {
    type: 'FEATURE_FLAGS_IS_LOADING',
    isLoading: bool,
  };
}

export function fetchFeatureFlagsDataSuccess(data) {
  return {
    type: 'FEATURE_FLAGS_DATA_SUCCESS',
    data,
  };
}

export function featureFlagsPostHasErrored(bool) {
  return {
    type: 'FEATURE_FLAGS_POST_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function featureFlagsPostIsLoading(bool) {
  return {
    type: 'FEATURE_FLAGS_POST_IS_LOADING',
    isLoading: bool,
  };
}

export function featureFlagsPostSuccess(success) {
  return {
    type: 'FEATURE_FLAGS_POST_SUCCESS',
    success,
  };
}

export function fetchFeatureFlagsData() {
  return (dispatch) => {
    dispatch(featureFlagsIsLoading(true));
    api().get('/featureflags/')
      .then((response) => {
        const featureFlagsData = get(response, 'data', {});
        batch(() => {
          dispatch(featureFlagsHasErrored(false));
          dispatch(featureFlagsIsLoading(false));
          dispatch(fetchFeatureFlagsDataSuccess(featureFlagsData));
        });
      })
      .catch(() => {
        axios
          .get(getAssetPath('/config/config.json'))
          .then((response) => {
            const featureFlagsDataLocal = get(response, 'data', {});
            batch(() => {
              dispatch(featureFlagsHasErrored(false));
              dispatch(featureFlagsIsLoading(false));
              dispatch(fetchFeatureFlagsDataSuccess(featureFlagsDataLocal));
            });
          })
          .catch(() => {
            batch(() => {
              dispatch(featureFlagsHasErrored(true));
              dispatch(featureFlagsIsLoading(false));
            });
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
          dispatch(toastSuccess(
            SystemMessages.POST_FEATURE_FLAGS_SUCCESS,
          ));
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(featureFlagsPostIsLoading(false));
          dispatch(featureFlagsPostHasErrored(true));
          dispatch(featureFlagsPostSuccess(false));
          dispatch(toastError(
            SystemMessages.POST_FEATURE_FLAGS_ERROR,
          ));
        });
      });
  };
}
