import Q from 'q';
import { get } from 'lodash';
import { CancelToken } from 'axios';
import q from 'query-string';
import api from '../api';

let cancel;

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

export function logsListHasErrored(message) {
  return {
    type: 'LOGS_LIST_HAS_ERRORED',
    hasErrored: message,
  };
}

export function logsListIsLoading(bool) {
  return {
    type: 'LOGS_LIST_IS_LOADING',
    isLoading: bool,
  };
}

export function logsListSuccess(data) {
  return {
    type: 'LOGS_LIST_SUCCESS',
    success: data,
  };
}

export function logHasErrored(message) {
  return {
    type: 'LOG_HAS_ERRORED',
    hasErrored: message,
  };
}

export function logIsLoading(bool) {
  return {
    type: 'LOG_IS_LOADING',
    isLoading: bool,
  };
}

export function logSuccess(data) {
  return {
    type: 'LOG_SUCCESS',
    success: data,
  };
}

export function logToDownloadHasErrored(message) {
  return {
    type: 'LOG_TO_DOWNLOAD_HAS_ERRORED',
    hasErrored: message,
  };
}

export function logToDownloadIsLoading(bool) {
  return {
    type: 'LOG_TO_DOWNLOAD_IS_LOADING',
    isLoading: bool,
  };
}

export function logToDownloadSuccess(data) {
  return {
    type: 'LOG_TO_DOWNLOAD_SUCCESS',
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
        const queryProms = data.map(log =>
          // get each log
          api().get(`/logs/${log}/`)
            .then(response => ({ log, data: response.data })));

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

export function getLogsList() {
  return (dispatch) => {
    dispatch(logsListIsLoading(true));
    dispatch(logsListHasErrored(false));
    // get list of logs
    api().get('/logs/')
      .then((logList) => {
        const data = get(logList, 'data.data', []);
        dispatch(logsListSuccess(data));
        dispatch(logsListHasErrored(false));
        dispatch(logsListIsLoading(false));
      })
      .catch(() => {
        logsSuccess('');
        dispatch(logsListHasErrored(true));
        dispatch(logsListIsLoading(false));
      });
  };
}

export function getLog(id, size) {
  if (cancel) { cancel('cancel'); }
  return (dispatch) => {
    dispatch(logIsLoading(true));
    dispatch(logHasErrored(false));

    let q$ = { size };
    q$ = q.stringify(q$);

    // get log by id
    api().get(`/logs/${id}/?${q$}`, {
      cancelToken: new CancelToken((c) => {
        cancel = c;
      }),
    })
      .then((logList) => {
        let data = get(logList, 'data.data', []);
        data = data.split('\n');
        if (data.length === 1 && !data[0]) {
          data = [];
        }
        dispatch(logSuccess(data));
        dispatch(logHasErrored(false));
        dispatch(logIsLoading(false));
      })
      .catch((m) => {
        if (get(m, 'message') !== 'cancel') {
          logSuccess([]);
          dispatch(logHasErrored(true));
          dispatch(logIsLoading(false));
        }
      });
  };
}

export function getLogToDownload(id, size = 1000) {
  return (dispatch) => {
    dispatch(logToDownloadIsLoading(true));
    dispatch(logToDownloadHasErrored(false));

    let q$ = { size };
    q$ = q.stringify(q$);

    let text = '';

    // get log by id
    api().get(`/logs/${id}/?${q$}`)
      .then((response) => {
        const logText = get(response, 'data.data', '');
        const logName = id;
        const lb = '\n'; // line-break

        // add individual log text to running list, wrapped in a START/END with its name
        text = `${text + lb}-- START ${logName} --${lb}${logText}${lb}-- END ${logName} --${lb}`;
        dispatch(logToDownloadSuccess(text));
        dispatch(logToDownloadHasErrored(false));
        dispatch(logToDownloadIsLoading(false));
      })
      .catch(() => {
        logSuccess([]);
        dispatch(logToDownloadHasErrored(true));
        dispatch(logToDownloadIsLoading(false));
      });
  };
}
