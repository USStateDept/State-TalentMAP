import { stringify } from 'query-string';
import { addMonths, subDays, subMonths } from 'date-fns';
import { eachMonthOfInterval, format } from 'date-fns-v2';
import api from '../api';

export const getTitle = (string = '', isUnique = false) => `${isUnique ? 'Unique' : 'Total'} logins in the past ${string}`;

export function statsHasErrored(bool) {
  return {
    type: 'STATS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function statsIsLoading(bool) {
  return {
    type: 'STATS_IS_LOADING',
    isLoading: bool,
  };
}

export function statsSuccess(count) {
  return {
    type: 'STATS_SUCCESS',
    count,
  };
}

export function statsIntervalsHasErrored(bool) {
  return {
    type: 'STATS_INTERVALS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function statsIntervalsIsLoading(bool) {
  return {
    type: 'STATS_INTERVALS_IS_LOADING',
    isLoading: bool,
  };
}

export function statsIntervalsSuccess(count) {
  return {
    type: 'STATS_INTERVALS_SUCCESS',
    count,
  };
}

export const fetchStats = ({ route, options = {} }) => {
  const options$ = { ...options, limit: 1 };
  const options$$ = stringify(options$);
  const url = `/stats/${route}/?${options$$}`;
  return (
    api().get(url)
      .then(({ data }) => data)
      .then(client => client)
      .catch(error => error)
  );
};

export function getLoginStats(today) {
  return (dispatch) => {
    dispatch(statsIsLoading(true));
    const today$ = today || new Date();

    const past24hrs = subDays(today$, 1).toJSON();
    const past3days = subDays(today$, 3).toJSON();
    const pastWeek = subDays(today$, 7).toJSON();
    const past30days = subDays(today$, 30).toJSON();
    const past90days = subDays(today$, 90).toJSON();
    const past180days = subDays(today$, 180).toJSON();
    const allTime = subDays(today$, 36500).toJSON();
    const today$$ = today$.toJSON();

    const promTypes = [
      { title: getTitle('24 hours'), type: 'total', route: 'logins', options: { date_of_login__gt: past24hrs, date_of_login__lte: today$$ } },
      { title: getTitle('3 days'), type: 'total', route: 'logins', options: { date_of_login__gt: past3days, date_of_login__lte: today$$ } },
      { title: getTitle('7 days'), type: 'total', route: 'logins', options: { date_of_login__gt: pastWeek, date_of_login__lte: today$$ } },
      { title: getTitle('30 days'), type: 'total', route: 'logins', options: { date_of_login__gt: past30days, date_of_login__lte: today$$ } },
      { title: getTitle('90 days'), type: 'total', route: 'logins', options: { date_of_login__gt: past90days, date_of_login__lte: today$$ } },
      { title: getTitle('180 days'), type: 'total', route: 'logins', options: { date_of_login__gt: past180days, date_of_login__lte: today$$ } },
      { title: getTitle('∞'), type: 'total', route: 'logins', options: { date_of_login__gt: allTime, date_of_login__lte: today$$ } },

      { title: getTitle('24 hours', true), type: 'unique', route: 'distinctlogins', options: { date_of_login__gt: past24hrs, date_of_login__lte: today$$ } },
      { title: getTitle('3 days', true), type: 'unique', route: 'distinctlogins', options: { date_of_login__gt: past3days, date_of_login__lte: today$$ } },
      { title: getTitle('7 days', true), type: 'unique', route: 'distinctlogins', options: { date_of_login__gt: pastWeek, date_of_login__lte: today$$ } },
      { title: getTitle('30 days', true), type: 'unique', route: 'distinctlogins', options: { date_of_login__gt: past30days, date_of_login__lte: today$$ } },
      { title: getTitle('90 days', true), type: 'unique', route: 'distinctlogins', options: { date_of_login__gt: past90days, date_of_login__lte: today$$ } },
      { title: getTitle('180 days', true), type: 'unique', route: 'distinctlogins', options: { date_of_login__gt: past180days, date_of_login__lte: today$$ } },
      { title: getTitle('∞', true), type: 'unique', route: 'distinctlogins', options: { date_of_login__gt: allTime, date_of_login__lte: today$$ } },
    ];

    const proms = promTypes.map(m => fetchStats({ route: m.route, options: m.options }));

    Promise.all(proms)
      .then((results) => {
        let proms$ = [...promTypes];
        proms$ = proms$.map((m, i) => ({ ...m, count: results[i].count }));
        dispatch(statsSuccess(proms$));
        dispatch(statsHasErrored(false));
        dispatch(statsIsLoading(false));
      })
      .catch(() => {
        dispatch(statsHasErrored(true));
        dispatch(statsIsLoading(false));
      });
  };
}

export function getLoginStatsIntervals(today) {
  return (dispatch) => {
    dispatch(statsIsLoading(true));
    const today$ = today || new Date();

    const intervals = eachMonthOfInterval({
      start: subMonths(today$, 11),
      end: today$,
    });

    const intervals$ = (type = 'total', route = 'logins') => intervals.map(m => {
      const start = m.toJSON();
      const end = addMonths(start, 1).toJSON();
      return { title: format(m, 'MMM'), type, route, options: { date_of_login__gt: start, date_of_login__lte: end } };
    });

    const promTypes = [...intervals$(), ...intervals$('unique', 'distinctlogins')];

    const proms = promTypes.map(m => fetchStats({ route: m.route, options: m.options }));

    Promise.all(proms)
      .then((results) => {
        let proms$ = [...promTypes];
        proms$ = proms$.map((m, i) => ({ ...m, count: results[i].count }));
        dispatch(statsIntervalsSuccess(proms$));
        dispatch(statsIntervalsHasErrored(false));
        dispatch(statsIntervalsIsLoading(false));
      })
      .catch(() => {
        dispatch(statsIntervalsHasErrored(true));
        dispatch(statsIntervalsIsLoading(false));
      });
  };
}
