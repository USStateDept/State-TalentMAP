import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shortId from 'shortid';
import { get, isNull } from 'lodash';
import FA from 'react-fontawesome';
import { Flag } from 'flag';
import Differentials from 'Components/Differentials';
import { BID_LIST, COMPARE_LIST } from 'Constants/PropTypes';
import COMPARE_LIMIT from 'Constants/Compare';
import { NO_BUREAU, NO_DATE, NO_GRADE, NO_POST, NO_SKILL, NO_TOUR_OF_DUTY } from 'Constants/SystemMessages';
import { formatDate, getAccessiblePositionNumber, getPostName, propOrDefault } from 'utilities';
import BackButton from '../BackButton';
import Spinner from '../Spinner';
import LanguageList from '../LanguageList/LanguageList';
import BidCount from '../BidCount';
import Favorite from '../../Containers/Favorite';
import CompareCheck from '../CompareCheck';
import BidListButton from '../../Containers/BidListButton';
import PermissionsWrapper from '../../Containers/PermissionsWrapper';
import { Handshake, HistDiffToStaff, IsHardToFill, ServiceNeedDifferential } from '../Ribbon';
import MediaQuery from '../MediaQuery';

export const renderBidCounts = (compareArray, emptyArray) => (
  <tr>
    <th scope="row">
        Bid Count
    </th>
    {
      compareArray.map((c) => {
        const bidStatistics = get(c, 'bid_statistics[0]', {});
        return (
          <td key={shortId.generate()}>
            <span className="bid-stats">
              <BidCount bidStatistics={bidStatistics} altStyle label="Bid Count" hideLabel />
            </span>
          </td>
        );
      })
    }
    {
      emptyArray.map(() => <td className="empty" key={shortId.generate()} />)
    }
  </tr>
);

class CompareList extends Component {
  renderBidListButtons = (compareArray, emptyArray) => {
    const { bidList } = this.props;
    return (
      <tr>
        <th scope="row">Add to Bid List</th>
        {
          compareArray.map((c) => {
            const availability = get(c.position, 'availability.availability');
            const availableToBid = isNull(availability) || !!availability;
            return (
              <td key={shortId.generate()}>
                <PermissionsWrapper permissions="bidder">
                  <BidListButton
                    compareArray={bidList.results}
                    id={c.id}
                    disabled={!availableToBid}
                  />
                </PermissionsWrapper>
              </td>
            );
          })
        }
        {
          emptyArray.map(() => <td className="empty" key={shortId.generate()} />)
        }
      </tr>
    );
  };

  render() {
    const { compare, isLoading, favorites, onToggle } = this.props;
    const limit = 5;
    const compareArray = compare.slice(0, COMPARE_LIMIT);
    const emptyArray = Array(limit - compareArray.length).fill();
    return (
      <div className="usa-grid-full content-container comparison-outer-container">
        <div>
          <BackButton blacklistMatcher="/compare" ignoreCurrentPath />
        </div>
        <div className="comparison-container">
          <h1>Compare Positions</h1>
          {
            isLoading ?
              <Spinner type="homepage-position-results" size="big" />
              :
              <div className="comparison-table-container">
                <table className="tm-table">
                  <caption className="usa-sr-only">Position details comparison:</caption>
                  <thead className="usa-sr-only">
                    <tr>
                      <th scope="row">
                        Position
                      </th>
                      {
                        compareArray.map(c => (
                          <th key={shortId.generate()}>
                            <div className="column-title-main">{c.title}</div>
                          </th>
                        ))
                      }
                      {
                        emptyArray.map(() => (<th className="empty" key={shortId.generate()}>
                          Return to search results and add more positions to compare.
                        </th>))
                      }
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">
                        Position
                      </th>
                      {
                        compareArray.map((c) => {
                          const { id, position } = c;
                          return (
                            <td key={shortId.generate()}>
                              <div className="usa-grid-full">
                                <div className="column-title-main">{position.title}</div>
                                <div className="close-button-container">
                                  <CompareCheck
                                    onToggle={() => onToggle(id)}
                                    refKey={id}
                                    customElement={<FA name="close" />}
                                    interactiveElementProps={{ title: 'Remove this comparison' }}
                                  />
                                </div>
                              </div>
                              <span aria-labelledby={
                                getAccessiblePositionNumber(position.position_number)
                              }
                              >
                                {position.position_number}
                              </span>
                            </td>
                          );
                        })
                      }
                      {
                        emptyArray.map(() => (<th className="empty" key={shortId.generate()}>
                          Return to search results and add more positions to compare.
                        </th>))
                      }
                    </tr>
                    <tr>
                      <th scope="row">Link to details</th>
                      {
                        compareArray.map(c => (
                          <td key={shortId.generate()}>
                            <div className="column-title-link">
                              <Link to={`/details/${c.id}`}>View position</Link>
                            </div>
                          </td>
                        ))
                      }
                      {
                        emptyArray.map(() => <td className="empty" key={shortId.generate()} />)
                      }
                    </tr>
                    {renderBidCounts(compareArray, emptyArray)}
                    <tr>
                      <th scope="row">
                        Location
                      </th>
                      {
                        compareArray.map(c => (
                          <td key={shortId.generate()}>
                            {getPostName(c.position.post, NO_POST)}
                          </td>
                        ))
                      }
                      {
                        emptyArray.map(() => <td className="empty" key={shortId.generate()} />)
                      }
                    </tr>
                    <tr>
                      <th scope="row">TED</th>
                      {
                        compareArray.map(c => (
                          <td key={shortId.generate()}>
                            {propOrDefault(c, 'ted') ? formatDate(c.ted) : NO_DATE }
                          </td>
                        ))
                      }
                      {
                        emptyArray.map(() => <td className="empty" key={shortId.generate()} />)
                      }
                    </tr>
                    <tr>
                      <th scope="row">Skill</th>
                      {
                        compareArray.map(c => (
                          <td key={shortId.generate()}>{c.position.skill || NO_SKILL}</td>
                        ))
                      }
                      {
                        emptyArray.map(() => <td className="empty" key={shortId.generate()} />)
                      }
                    </tr>
                    <tr>
                      <th scope="row">Grade</th>
                      {
                        compareArray.map(c => (
                          <td key={shortId.generate()}>{c.position.grade || NO_GRADE}</td>
                        ))
                      }
                      {
                        emptyArray.map(() => <td className="empty" key={shortId.generate()} />)
                      }
                    </tr>
                    <tr>
                      <th scope="row">Bureau</th>
                      {
                        compareArray.map(c => (
                          <td key={shortId.generate()}>{c.position.bureau || NO_BUREAU}</td>
                        ))
                      }
                      {
                        emptyArray.map(() => <td className="empty" key={shortId.generate()} />)
                      }
                    </tr>
                    <tr>
                      <th scope="row">Tour of duty</th>
                      {
                        compareArray.map(c => (
                          <td key={shortId.generate()}>
                            {
                              c.position.post && c.position.post.tour_of_duty
                                ? c.position.post.tour_of_duty
                                : NO_TOUR_OF_DUTY
                            }
                          </td>
                        ))
                      }
                      {
                        emptyArray.map(() => <td className="empty" key={shortId.generate()} />)
                      }
                    </tr>
                    <tr>
                      <th scope="row">Language</th>
                      {
                        compareArray.map(c => (
                          <td key={shortId.generate()}>
                            <LanguageList languages={c.position.languages} propToUse="representation" />
                          </td>
                        ))
                      }
                      {
                        emptyArray.map(() => <td className="empty" key={shortId.generate()} />)
                      }
                    </tr>
                    <tr>
                      <th scope="row">Post differential | Danger Pay</th>
                      {
                        compareArray.map((c) => {
                          const dangerPay = get(c, 'position.post.danger_pay');
                          const postDifferential = get(c, 'position.post.differential_rate');
                          const obcUrl = get(c, 'position.post.post_bidding_considerations_url');
                          const props = { dangerPay, postDifferential, obcUrl };
                          return (
                            <td key={shortId.generate()}>
                              <Differentials {...props} />
                            </td>
                          );
                        })
                      }
                      {
                        emptyArray.map(() => <td className="empty" key={shortId.generate()} />)
                      }
                    </tr>
                    <tr>
                      <th scope="row">Favorite</th>
                      {
                        compareArray.map(c => (
                          <td key={shortId.generate()}>
                            <Favorite
                              hasBorder
                              refKey={c.id}
                              compareArray={favorites}
                              useButtonClass
                              refresh
                              useButtonClassSecondary
                            />
                          </td>
                        ))
                      }
                      {
                        emptyArray.map(() => <td className="empty" key={shortId.generate()} />)
                      }
                    </tr>
                    <Flag
                      name="flags.static_content"
                      render={() => this.renderBidListButtons(compareArray, emptyArray)}
                    />
                    <tr>
                      <th scope="row" />
                      {
                        compareArray.map((c) => (
                          <MediaQuery breakpoint="screenLgMin" widthType="min">
                            {matches => (
                              <td key={shortId.generate()} className="compare-ribbon">
                                {
                                  get(c, 'bid_statistics[0].has_handshake_offered', false) &&
                                  <Handshake
                                    shortName
                                    isWide={matches}
                                    showText={matches}
                                  />
                                }
                                {
                                  get(c, 'isDifficultToStaff', false) &&
                                  <HistDiffToStaff
                                    shortName
                                    isWide={matches}
                                    showText={matches}
                                  />
                                }
                                {
                                  get(c, 'isServiceNeedDifferential', false) &&
                                  <ServiceNeedDifferential
                                    shortName
                                    isWide={matches}
                                    showText={matches}
                                  />
                                }
                                {
                                  get(c, 'isHardToFill', false) &&
                                  <IsHardToFill
                                    shortName
                                    isWide={matches}
                                    showText={matches}
                                  />
                                }
                              </td>
                            )}
                          </MediaQuery>

                        ))
                      }
                      {
                        emptyArray.map(() => <td className="empty" key={shortId.generate()} />)
                      }
                    </tr>
                  </tbody>
                </table>
              </div>
          }
        </div>
      </div>
    );
  }
}

CompareList.propTypes = {
  compare: COMPARE_LIST,
  isLoading: PropTypes.bool,
  favorites: PropTypes.arrayOf(PropTypes.shape({})),
  onToggle: PropTypes.func.isRequired,
  bidList: BID_LIST,
};

CompareList.defaultProps = {
  compare: [],
  isLoading: false,
  favorites: [],
  bidList: { results: [] },
};

export default CompareList;
