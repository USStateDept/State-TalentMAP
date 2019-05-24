import Q from 'q';
import { get } from 'lodash';
import api from '../api';

export function logsHasErrored(message) {
  return {
    type: 'LOGS_HAS_ERRORED',
    hasErrored: message,
  };
}

export function logsIsLoading(bool) {
  return {
    type: 'LOGS_IS_LOADING',
    isLoading: bool,
  };
}

export function logsSuccess(data) {
  return {
    type: 'LOGS_SUCCESS',
    success: data,
  };
}

export function getLogs() {
  return (dispatch) => {
    dispatch(logsIsLoading(true));
    dispatch(logsHasErrored(false));
    // get list of logs
    api().get('/logs/')
      .then((logList) => {
        const data = get(logList, 'data.data', []);

        let text = '';

        // create promise array to retrieve individual logs
        const queryProms = data.map((log) => {
          // remove the .log suffix
          const log$ = log.replace(/.log/g, '');
          // get each log
          return api().get(`/logs/${log$}/`)
            .then(response => ({ log, data: response.data }));
        });

        // execute queries
        Q.allSettled(queryProms)
        .then((results) => {
          results.forEach((response) => {
            const logText = get(response, 'value.data.data', '');
            const logName = get(response, 'value.log', '');
            if (response.state === 'fulfilled') {
              const lb = '\n'; // line-break

              // add individual log text to running list, wrapped in a START/END with its name
              text = `${text + lb}-- START ${logName} --${lb}${logText}${lb}-- END ${logName} --${lb}`;
            }
          });
          dispatch(logsSuccess(text));
          dispatch(logsHasErrored(false));
          dispatch(logsIsLoading(false));
        });
      })
      .catch(() => {
        logsSuccess('');
        dispatch(logsHasErrored(true));
        dispatch(logsIsLoading(false));
      });
  };
}
