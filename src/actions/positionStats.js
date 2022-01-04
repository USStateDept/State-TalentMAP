import { stringify } from 'query-string';
import { subDays } from 'date-fns';
import { POSITION_VIEW_TYPES } from 'Constants/PositionView';
import api from '../api';

export const getTitle = (string = '', isUnique = false) => `${isUnique ? 'unique' : 'total'} view(s) in the past ${string}`;

export function positionViewsHasErrored(bool) {
  return {
    type: 'POSITION_VIEWS_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function positionViewsIsLoading(bool) {
  return {
    type: 'POSITION_VIEWS_IS_LOADING',
    isLoading: bool,
  };
}

export function positionViewsSuccess(count) {
  return {
    type: 'POSITION_VIEWS_SUCCESS',
    count,
  };
}

export const postPositionView = (id, type = POSITION_VIEW_TYPES.AP.value) => {
  api().post('/stats/positionview/', { position_id: id, position_type: type })
    .then(() => {})
    .catch(() => {});
};

export const fetchViews = ({ route, options = {} }) => {
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

export function getViewStats(id, type) {
  return (dispatch) => {
    dispatch(positionViewsIsLoading(true));
    const today$ = new Date();
    const past30days = subDays(today$, 30).toJSON();
    const today$$ = today$.toJSON();

    const promTypes = [
      { title: getTitle('30 days'), type: 'unique', route: 'distinctpositionviews', options: { date_of_view__gt: past30days, date_of_view__lte: today$$, position_id: id, position_type: type } },
    ];

    const proms = promTypes.map(m => fetchViews({ route: m.route, options: m.options }));

    Promise.all(proms)
      .then((results) => {
        let proms$ = [...promTypes];
        proms$ = proms$.map((m, i) => ({ ...m, count: results[i].count }));
        dispatch(positionViewsSuccess(proms$));
        dispatch(positionViewsHasErrored(false));
        dispatch(positionViewsIsLoading(false));
      })
      .catch(() => {
        dispatch(positionViewsHasErrored(true));
        dispatch(positionViewsIsLoading(false));
      });
  };
}
