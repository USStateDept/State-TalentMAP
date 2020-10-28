/* eslint-disable */
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { get } from 'lodash';
import Skeleton from 'react-loading-skeleton';

const PositionViews = ({ views, viewsIsLoading, viewsHasErored }) => {
  const view = get(views, '[0]', {});
  const views$ = numeral(view.count).format('0,0');
  let text = `${views$} ${view.title}`;
  if (viewsIsLoading) text = <Skeleton />;
  if (viewsHasErored) text = 'Error loading statistics';
  return (
    <span>{text}</span>
  );
};

PositionViews.propTypes = {
  views: PropTypes.arrayOf(PropTypes.shape({})),
  viewsIsLoading: PropTypes.bool,
  viewsHasErored: PropTypes.bool,
};

PositionViews.defaultProps = {
  views: [],
  viewsIsLoading: false,
  viewsHasErored: false,
};

const mapStateToProps = state => ({
  views: state.positionViews,
  viewsIsLoading: state.positionViewsIsLoading,
  viewsHasErored: state.positionViewsHasErored,
});

export default connect(mapStateToProps)(PositionViews);
