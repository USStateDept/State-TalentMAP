import React, { Component } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { connect } from 'react-redux';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { round } from 'lodash';
import CountUp from 'react-countup';
import LinkButton from '../LinkButton';
import { positionCountFetchData } from '../../actions/positionCount';

class HomePageBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
    };
  }

  componentWillMount() {
    this.props.fetchCount();
  }

  render() {
    const { positionCount, isLoading } = this.props;
    // Round to nearest ten, but only if there are more than 50 positions.
    // Subtract the count by 6 to ensure that it will always be rounded down to the nearest 10 (-1)
    const shouldRound = positionCount > 50;
    const roundedCount = shouldRound ? round(positionCount - 6, -1) : positionCount;
    return (
      <div className="usa-grid-full homepage-search-banner" style={{ color: 'white', maxWidth: 'none', padding: '49px 49px 39px 49px', textAlign: 'center' }}>
        <div className="usa-grid-full">
          <h2>TalentMAP Position Search</h2>
          <div>
            {`
              TalentMAP is an enhanced research and bidding tool you can
              use to find your next position or plan for a future cycle.
            `}
          </div>
          <div>
            <SkeletonTheme color="#00293F" highlightColor="#fff">
              <span className="stats-text">
                {
                  !roundedCount && !isLoading &&
                  <span>There are no positions available for bidding</span>
                }
                <span>
                  <span>There are more than&nbsp;</span>
                  {
                    isLoading ?
                      <Skeleton width="25px" duration={1.1} />
                      :
                      <CountUp end={roundedCount} duration={1.4} formattingFn={n => numeral(n).format('0,0')}>
                        {({ countUpRef }) => (
                          <span ref={countUpRef} />
                      )}
                      </CountUp>
                  }
                  <span>&nbsp;positions available for bidding.</span>
                </span>
              </span>
            </SkeletonTheme>
          </div>
          <LinkButton toLink="/results">Find Your Next Position</LinkButton>
        </div>
      </div>
    );
  }
}

HomePageBanner.propTypes = {
  positionCount: PropTypes.number,
  fetchCount: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

HomePageBanner.defaultProps = {
  positionCount: 0,
  isLoading: false,
};

const mapStateToProps = state => ({
  positionCount: state.positionCount,
  isLoading: state.positionCountIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  fetchCount: () => dispatch(positionCountFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePageBanner);
