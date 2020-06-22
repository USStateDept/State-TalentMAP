import { batch } from 'react-redux';
import { get } from 'lodash';
import api from '../api';

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
        /*
        // the same way you call /api/v1/my/cool/endpoint, you can call /config/config.json
          api().get('/config/config.json')
            .then((responseTwo) => {
              const hmm = get(responseTwo, 'data', {});
              // eslint-disable-next-line no-console
              console.log('current: hmm:');
              // eslint-disable-next-line no-console
              console.log(hmm);
              // the same way you call /api/v1/my/cool/endpoint, you can call /config/config.json */
        batch(() => {
          dispatch(featureFlagsHasErrored(false));
          dispatch(featureFlagsIsLoading(false));
          dispatch(fetchFeatureFlagsDataSuccess(featureFlagsData));
        });
      })
      .catch(() => {
        let featureFlagsDataLocal = sessionStorage.getItem('config');
        if (featureFlagsDataLocal) {
          try {
            featureFlagsDataLocal = get(JSON.parse(featureFlagsDataLocal), 'flags');
            batch(() => {
              dispatch(featureFlagsHasErrored(false));
              dispatch(featureFlagsIsLoading(false));
              dispatch(fetchFeatureFlagsDataSuccess(featureFlagsDataLocal));
            });
          } catch (e) {
            featureFlagsDataLocal = {};
            batch(() => {
              dispatch(featureFlagsHasErrored(true));
              dispatch(featureFlagsIsLoading(false));
            });
          }
        }
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
