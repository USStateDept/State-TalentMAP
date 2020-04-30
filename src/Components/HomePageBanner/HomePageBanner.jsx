import React, { Component } from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { connect } from 'react-redux';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { round } from 'lodash';
import CountUp from 'react-countup';
import LinkButton from '../LinkButton';
import { positionCountFetchData } from '../../actions/positionCount';
import { getAssetPath } from '../../utilities';

const logo = getAssetPath('/assets/logos/png/horizontal_color_thin-sm.png');

export const formatNum = n => numeral(n).format('0,0');

class HomePageBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 0,
    };
  }

  UNSAFE_componentWillMount() {
    this.props.fetchCount();
  }

  render() {
    const { positionCount, isLoading } = this.props;
    // Round to nearest ten, but only if there are more than 50 positions.
    // Subtract the count by 6 to ensure that it will always be rounded down to the nearest 10 (-1)
    const shouldRound = positionCount > 50;
    const roundedCount = shouldRound ? round(positionCount - 6, -1) : positionCount;
    let preText = shouldRound ? 'There are more than' : 'There are';
    if (positionCount === 1) { preText = 'There is'; }
    const positionTextPlural = positionCount === 1 ? 'position' : 'positions';
    return (
      <div className="usa-grid-full homepage-search-banner">
        <div className="usa-grid-full">
          <img src={logo} alt="TalentMAP logo" />
          <div>
            {`
              TalentMAP is an enhanced research and bidding tool you can
              use to find your next position or plan for a future cycle.
            `}
          </div>
          <div>
            <SkeletonTheme color="#0071BB" highlightColor="#fff">
              <span className="stats-text">
                {
                  !roundedCount && !isLoading &&
                  <span>There are no positions available for bidding</span>
                }
                {
                  !roundedCount && !isLoading ?
                    null :
                    <span className="stats-text--position">
                      <span>{preText}&nbsp;</span>
                      {
                        isLoading ?
                          <Skeleton width="25px" duration={1.1} />
                          :
                          <CountUp end={roundedCount} duration={1.4} formattingFn={formatNum}>
                            {({ countUpRef }) => (
                              <span ref={countUpRef} />
                            )}
                          </CountUp>
                      }
                      <span>&nbsp;{positionTextPlural} available for bidding.</span>
                    </span>
                }
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
