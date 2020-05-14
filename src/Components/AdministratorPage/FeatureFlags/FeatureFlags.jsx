import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { JsonEditor as Editor } from 'jsoneditor-react';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import Spinner from '../../Spinner';
// import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';
// import { getLoginStats } from '../../../actions/featureFlags';

export const formatNum = n => numeral(n).format('0,0');

class FeatureFlags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };
  }

  handleChange = data => {
    // eslint-disable-next-line no-console
    console.log('current: data:', data);
  };
  render() {
    const {
      featureFlags,
      // eslint-disable-next-line no-unused-vars
      stats,
      statsIsLoading,
      statsHasErrored,
    } = this.props;

    // eslint-disable-next-line no-unused-vars
    const statsSuccess = !statsIsLoading && !statsHasErrored;
    const tempjson = {
      iam: 'a',
      js: 'on',
      ob: 'ject',
      isJson: true,
      myArr: [1, 2, 3, 4, 5],
      a: 1,
      b: {
        c: {
          d: 'e',
        },
      },
    };
    return (
      <div
        className={`usa-grid-full profile-content-inner-container administrator-page
        ${(statsIsLoading) ? 'results-loading' : ''}`}
      >
        {
          statsIsLoading &&
            <Spinner type="homepage-position-results" size="big" />
        }
        <div className="usa-grid-full">
          <ProfileSectionTitle title="Feature Flags" icon="flag" />
        </div>
        :)
        {featureFlags.toString()}
        :)
        <Editor
          value={tempjson}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

FeatureFlags.propTypes = {
  featureFlags: PropTypes.string,
  stats: PropTypes.arrayOf(PropTypes.shape({})),
  statsIsLoading: PropTypes.bool,
  statsHasErrored: PropTypes.bool,
  // getStats: PropTypes.func,
};

FeatureFlags.defaultProps = {
  featureFlags: '',
  stats: [],
  statsIsLoading: false,
  statsHasErrored: false,
  // getStats: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  stats: state.stats,
  statsIsLoading: state.statsIsLoading,
  statsHasErrored: state.statsHasErrored,
});

export default connect(mapStateToProps)(FeatureFlags);
