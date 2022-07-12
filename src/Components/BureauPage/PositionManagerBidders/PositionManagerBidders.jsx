import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { get, isEqual, keys, orderBy } from 'lodash';
import FA from 'react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'react-tippy';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Skeleton from 'react-loading-skeleton';
import { formatDate, move } from 'utilities';
import { checkFlag } from 'flags';
import { CLASSIFICATIONS, EMPTY_FUNCTION } from 'Constants/PropTypes';
import { Icons } from 'Constants/Classifications';
import { NO_CLASSIFICATIONS, NO_END_DATE, NO_GRADE, NO_LANGUAGE, NO_SKILL, NO_SUBMIT_DATE } from 'Constants/SystemMessages';
import { DECONFLICT_TOOLTIP_TEXT, OTHER_HANDSHAKE_TOOLTIP_TEXT } from 'Constants/Tooltips';
import { BUREAU_BIDDER_FILTERS, BUREAU_BIDDER_SORT } from 'Constants/Sort';
import SelectForm from 'Components/SelectForm';
import Alert from 'Components/Alert';
import HandshakeStatus from 'Components/Handshake/HandshakeStatus';
import HandshakeBureauButton from 'Components/Handshake/HandshakeBureauButton';
import InteractiveElement from 'Components/InteractiveElement';
import LoadingText from 'Components/LoadingText';
import PermissionsWrapper from 'Containers/PermissionsWrapper';
import ShortListLock from '../ShortListLock';
import BidderRankings from '../BidderRankings';
import MailToButton from '../../MailToButton';
import { tertiaryCoolBlueLight, tertiaryCoolBlueLightest } from '../../../sass/sass-vars/variables';
import HandshakeAnimation from '../../BidTracker/BidStep/HandshakeAnimation';

const postHandshakeVisibility = () => checkFlag('flags.post_handshake');

const getClassificationsInfo = (userClassifications, refClassifications) => {
  const classificationsInfo = [];
  const shortCodesCache = [];
  refClassifications.forEach(a => {
    a.seasons.forEach(b => {
      const c = userClassifications.find(f => f === b.id);
      if (c) {
        const k = shortCodesCache.indexOf(Icons[a.code].shortCode);
        if (k < 0) {
          shortCodesCache.push(Icons[a.code].shortCode);
          classificationsInfo.push({
            icon: Icons[a.code].name,
            shortCode: Icons[a.code].shortCode,
            text: a.text,
            seasons: [b.season_text],
          });
        } else {
          classificationsInfo[k].seasons.push(b.season_text);
        }
      }
    });
  });
  return classificationsInfo;
};

const getClassificationsTooltip = (classifications) => (
  <div>
    {classifications.map(i => (
      <div className="classification-wrapper">
        <div className="classification-text">
          <FontAwesomeIcon
            icon={get(i, 'icon')}
            className="classification-icon"
          />
          {i.text}
        </div>
        <div className="classification-season-wrapper">
          {(get(i, 'seasons') || []).map(s => (
            <div className="classification-season">{s}</div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const getItemStyle = (isDragging, draggableStyle) => {
  const border = isDragging ? '1px solid black' : 'none';
  const height = isDragging ? '130px' : '';
  const overflowY = isDragging ? 'hidden' : '';
  return {
  // some basic styles to make the items look a bit nicer
    userSelect: 'none',

    // Make sure all border css is overridden
    borderTop: border,
    borderBottom: border,
    borderRight: border,
    borderLeft: border,
    height,
    overflowY,

    // styles we need to apply on draggables
    ...draggableStyle,
  };
};

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? tertiaryCoolBlueLightest : tertiaryCoolBlueLight,
  maxHeight: 1000,
  overflowY: 'scroll',
});

const rankedBids = (bids, ranking) => {
  const bids$ = orderBy((bids || []).map(m => {
    const m$ = { ...m };
    const match = ranking.find(f => +f.bidder_perdet === +m.emp_id);
    if (match) {
      const { rank } = match;
      m$.rank = rank;
      return m$;
    }
    return null;
  }).filter(f => f), ['rank']);
  return bids$;
};

const unrankedBids = (bids, ranking) => (bids || []).map(m => {
  const match = ranking.find(f => +f.bidder_perdet === +m.emp_id);
  if (match) {
    return null;
  }
  return m;
}).filter(f => f);

const getTooltipText = (title, text) => (
  <div>
    <FA name={'exclamation-triangle'} className={'deconflict-indicator-small'} />
    <div className={'tooltip-title'}>{title}</div>
    <div className={'tooltip-text'}>{text}</div>
  </div>
);

class PositionManagerBidders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shortList: this.getItems(rankedBids(props.allBids, props.ranking), 'shortList'),
      unranked: this.getItems(unrankedBids(props.bids, props.ranking), 'unranked'),
      hasLoaded: false,
      rankingUpdate: Date.now(), // track when the user performs an action
      shortListVisible: true,
      unrankedVisible: true,
      isMouseDown: false,
      mouseDownEmp: '',
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    let state = {};
    if (!nextProps.bidsIsLoading) {
      state = { ...state, hasLoaded: true };
    }
    state = {
      ...state,
      shortList: this.getItems(rankedBids(nextProps.allBids, nextProps.ranking), 'shortList', nextProps),
      unranked: this.getItems(unrankedBids(nextProps.bids, nextProps.ranking), 'unranked', nextProps),
    };

    this.setState(state);
  }

  // Logic to check that either one of the lists updated, or a manually triggered (drag or rank)
  // action took place. If so, re-calculate the lists to get the ranking dropdowns to re-render.
  // If the ranking change was triggered by the user, call this.props.setRanking.
  componentDidUpdate(prevProps, prevState) {
    const { rankingUpdate, shortList, unranked } = this.state;
    const { bidsIsLoading } = this.props;

    const shortListUpdated = !isEqual(
      shortList.map(m => m.emp_id), prevState.shortList.map(m => m.emp_id));

    const unrankedUpdated = !isEqual(
      unranked.map(m => m.emp_id), prevState.unranked.map(m => m.emp_id));

    const rankingUpdatedByUser = !isEqual(rankingUpdate, prevState.rankingUpdate);

    const loadingHasChanged = !isEqual(bidsIsLoading, prevProps.bidsIsLoading);

    if (shortListUpdated || unrankedUpdated || rankingUpdatedByUser || loadingHasChanged) {
      // Running setState should be safe since it's conditional on multiple isEqual statements
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        shortList: this.getItems(shortList.map(m => m.bid), 'shortList', this.props),
        unranked: this.getItems(unranked.map(m => m.bid), 'unranked', this.props),
      }, () => {
        if (rankingUpdatedByUser) {
          const ranking$ = shortList.map((m, i) => ({ rank: i, bidder_perdet: `${m.emp_id}` }));
          this.props.setRanking(ranking$);
        }
      });
    }
  }

  onDragEnd = result => {
    const { source, destination } = result;

    const rankingUpdate = Date.now();

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const shortList = move(
        this.getList(source.droppableId),
        source.index,
        destination.index,
      );

      let state = { shortList };

      if (source.droppableId === 'droppable2') {
        state = { unranked: shortList };
      }

      if (destination.droppableId === 'droppable') {
        state = { ...state, rankingUpdate };
      }

      this.setState({ ...state });
    } else {
      const result$ = this.move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination,
      );

      this.setState({
        shortList: result$.droppable,
        unranked: result$.droppable2,
        rankingUpdate,
      });
    }
  };

  // data generator
  getItems = (bids, type, props = this.props) =>
    bids.map((k, i) => ({
      id: `item-${k.emp_id}-${type}`,
      content: this.bid$(k, props, i, bids.length, type),
      emp_id: k.emp_id,
      bid: k, // the original bid
    }));

  getList = id => this.state[this.id2List[id]];

  // type = 'shortListVisible' or 'unrankedVisible'
  toggleVisibility = type => {
    const type$ = get(this.state, type);
    this.setState({ [type]: !type$ });
  }

  // Renders an individual bid
  bid$ = (m, props = this.props, iter, len, type) => {
    const ted = get(m, 'ted');
    const submitted = get(m, 'submitted_date');
    const formattedTed = ted ? formatDate(ted) : NO_END_DATE;
    const formattedSubmitted = submitted ? formatDate(submitted) : NO_SUBMIT_DATE;
    const deconflict = get(m, 'has_competing_rank');
    const handshake = get(m, 'handshake', {}) || {};
    const handshakeRegisteredDate = get(m, 'handshake_registered_date');
    const handshakeRegistered = get(m, 'handshake_registered') === 'Y';
    const active_hs_perdet = get(m, 'active_handshake_perdet');
    const hasAcceptedOtherOffer = get(m, 'has_accepted_other_offer');
    const bureauOBidderA = (get(handshake, 'hs_status_code') === 'handshake_offered')
      && (get(handshake, 'bidder_hs_code') === 'handshake_accepted');

    const classifications = getClassificationsInfo(get(m, 'classifications') || [], props.classifications);
    const sections = {
      RetainedSpace: type === 'unranked' ? 'Unranked' :
        <select name="ranking" disabled={this.isDndDisabled()} value={iter} onChange={a => { this.setState({ rankingUpdate: Date.now(), shortList: move(this.state.shortList, iter, a.target.value) }); }}>
          {[...Array(len).keys()]
            .map((e) => (<option
              key={e}
              value={e}
            >{e + 1}</option>))}
        </select>,
      Deconflict: (
        <div className="alert-indicators">
          {!!deconflict && <Tooltip
            html={getTooltipText(DECONFLICT_TOOLTIP_TEXT.title, DECONFLICT_TOOLTIP_TEXT.text)}
            theme={'deconflict-indicator'}
            arrow
            tabIndex="0"
            interactive
            style={{ height: 'fit-content' }}
            useContext
            position="right"
          >
            <FA name={'exclamation-triangle'} className={'deconflict-indicator'} />
          </Tooltip>}
          {!!hasAcceptedOtherOffer && <Tooltip
            html={getTooltipText(OTHER_HANDSHAKE_TOOLTIP_TEXT.title,
              OTHER_HANDSHAKE_TOOLTIP_TEXT.text)}
            theme={'has-other-handshake-indicator'}
            arrow
            tabIndex="0"
            interactive
            style={{ height: 'fit-content' }}
            useContext
            position="right"
          >
            <FA name={'exclamation-triangle'} className={'has-other-handshake-indicator'} />
          </Tooltip>}
        </div>
      ),
      Name: (<Link to={`/profile/public/${m.emp_id}/bureau`}>{get(m, 'name')}</Link>),
      SubmittedDate: formattedSubmitted,
      Skill: get(m, 'skill') || NO_SKILL,
      Grade: get(m, 'grade') || NO_GRADE,
      Language: get(m, 'language') || NO_LANGUAGE,
      Classifications: classifications.length ?
        <Tooltip
          html={getClassificationsTooltip(classifications)}
          theme={'classifications'}
          arrow
          tabIndex="0"
          interactive
          style={{ height: 'fit-content' }}
          useContext
        >
          {classifications.map(c => c.shortCode).join(', ')}
        </Tooltip>
        : NO_CLASSIFICATIONS,
      TED: formattedTed,
      CDO: get(m, 'cdo.email') ? <MailToButton email={get(m, 'cdo.email')} textAfter={get(m, 'cdo.name')} /> : 'N/A',
      Action:
        <>
          <PermissionsWrapper
            permissions="bureau_user"
            fallback={
              postHandshakeVisibility() &&
              <HandshakeStatus
                handshake={handshake}
              />
            }
          >
            { this.props.hasHsReg && bureauOBidderA ?
              <>
                <HandshakeAnimation isBidder />
                <HandshakeStatus
                  handshake={handshake}
                  handshakeRegistered={handshakeRegistered}
                  handshakeRegisteredDate={handshakeRegisteredDate}
                  infoIcon
                />
              </> :
              <HandshakeStatus
                handshake={handshake}
              />
            }
          </PermissionsWrapper>
          {
            type !== 'unranked' &&
            <PermissionsWrapper permissions="bureau_user">
              <HandshakeBureauButton
                handshake={handshake}
                positionID={props.id}
                personID={m.emp_id}
                activePerdet={active_hs_perdet}
                bidCycle={get(props, 'bidCycle', {})}
              />
            </PermissionsWrapper>
          }
        </>,
    };

    if (props.bidsIsLoading) {
      keys(sections).forEach(k => {
        sections[k] = <Skeleton />;
      });
    }

    const tableRows = (
      <tr>
        {keys(sections).map(i => (
          <td key={i}>{sections[i]}</td>
        ))}
      </tr>
    );
    return tableRows;
  };

  /**
   * Moves an item from one list to another list.
   */
  move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);

    const [cloned] = [...sourceClone].splice(droppableSource.index, 1);
    destClone.splice(droppableDestination.index, 0, cloned);
    sourceClone.splice(droppableSource.index, 1);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  isDndDisabled = () => {
    const { bidsIsLoading, isLocked,
      hasBureauPermission } = this.props;
    return bidsIsLoading || (isLocked && !hasBureauPermission);
  }

    /**
       * A semi-generic way to handle multiple lists. Matches
       * the IDs of the droppable container to the names of the
       * source arrays stored in the state.
     */
    id2List = {
      droppable: 'shortList',
      droppable2: 'unranked',
    };

  handleEvent = (event, id) => {
    if (event.type === 'mousedown') {
      this.setState({ isMouseDown: true, mouseDownEmp: id });
    }
    if (event.type === 'mouseup') {
      this.setState({ isMouseDown: false, mouseDownEmp: '' });
    }
  }

  render() {
    const { bids, bidsIsLoading, filtersSelected, filters, id, isLocked,
      hasBureauPermission, bidCycle } = this.props;
    const { hasLoaded, shortListVisible, unrankedVisible } = this.state;

    const tableHeaders = ['Ranking', '', 'Name', 'Submitted Date', 'Skill', 'Grade', 'Language', 'Classifications', 'TED', 'CDO', ''].map(item => (
      <th scope="col">{item}</th>
    ));

    const shortListLock = (<ShortListLock
      id={id}
      biddersInShortList={this.state.shortList.length}
    />);

    const dndDisabled = this.isDndDisabled();

    const shortListSection = (
      <>
        <div className="list-toggle-container">
          <InteractiveElement title="Toggle visibility" onClick={() => this.toggleVisibility('shortListVisible')}><FA name={shortListVisible ? 'chevron-down' : 'chevron-up'} /></InteractiveElement>
          <h3>Short List ({this.state.shortList.length})</h3>
          {shortListLock}
        </div>
        {
          shortListVisible &&
          <table className="position-manager-bidders-table">
            <thead>
              <tr>
                {tableHeaders}
              </tr>
            </thead>
            <tbody>
              <Droppable droppableId="droppable" isDropDisabled={dndDisabled}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                  >
                    {this.state.shortList.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                        isDragDisabled={dndDisabled}
                      >
                        {(provided$, snapshot$) => (
                          <div
                            role="row"
                            tabIndex={0}
                            onMouseDown={(e) => { this.handleEvent(e, item.bid.emp_id); }}
                            onMouseUp={this.handleEvent}
                            ref={provided$.innerRef}
                            {...provided$.draggableProps}
                            {...provided$.dragHandleProps}
                            style={getItemStyle(
                              snapshot$.isDragging,
                              provided$.draggableProps.style,
                            )}
                            className={snapshot$.isDragging ? 'is-dragging' : ''}
                          >
                            {item.content}
                            <BidderRankings
                              perdet={item.bid.emp_id}
                              cp_id={id}
                              is_dragging={snapshot.isDraggingOver}
                              is_mouse_down={this.state.isMouseDown}
                              mouse_down_emp={this.state.mouseDownEmp}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </tbody>
          </table>
        }
      </>
    );

    return (
      <div className="usa-width-one-whole position-manager-bidders">
        { !bids.length && !!hasLoaded && shortListLock }
        <DragDropContext onDragEnd={this.onDragEnd}>
          {
            // >:)
            // eslint-disable-next-line no-nested-ternary
            bidsIsLoading ? <LoadingText /> :
              (
                !bids.length && !filtersSelected && !bidsIsLoading ?
                  <Alert type="info" title="There are no bids on this position" />
                  :
                  <>
                    {/* eslint-disable no-nested-ternary */}
                    {!get(bidCycle, 'handshake_allowed_date') && <Alert type="dark" title="Bureaus cannot offer handshakes for this cycle at this time" />}
                    {isLocked ?
                      hasBureauPermission ? shortListSection : <>
                        <Alert
                          type="info"
                          title="Short List Locked"
                          messages={[{ body: 'The short list has been locked by the bureau. You cannot modify the short list until it has been unlocked.' }]}
                        />
                        <div>
                          {shortListSection}
                        </div>
                      </>
                      : shortListSection }
                    {/* eslint-enable no-nested-ternary */}
                    <div className="bidders-controls">
                      <SelectForm
                        id="sort"
                        label="Sort by:"
                        defaultSort={filters.ordering || 'bidder_grade'}
                        options={BUREAU_BIDDER_SORT.options}
                        disabled={false}
                        onSelectOption={e => this.props.onSort(e.target.value)}
                      />
                      <SelectForm
                        id="filter"
                        options={BUREAU_BIDDER_FILTERS.options}
                        label="Filter By:"
                        defaultSort={filters.handshake_code || ''}
                        disabled={false}
                        onSelectOption={e => this.props.onFilter('handshake_code', e.target.value)}
                      />
                    </div>
                    <div className="list-toggle-container">
                      <InteractiveElement title="Toggle visibility" onClick={() => this.toggleVisibility('unrankedVisible')}><FA name={unrankedVisible ? 'chevron-down' : 'chevron-up'} /></InteractiveElement>
                      <h3>Candidates ({this.state.unranked.length})</h3>
                    </div>
                    {
                      unrankedVisible &&
                        <table className="position-manager-bidders-table">
                          <thead>
                            <tr>
                              {tableHeaders}
                            </tr>
                          </thead>
                          <tbody>
                            <Droppable droppableId="droppable2" isDropDisabled={dndDisabled}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  style={getListStyle(snapshot.isDraggingOver)}
                                >
                                  {this.state.unranked.map((item, index) => (
                                    <Draggable
                                      key={item.id}
                                      draggableId={item.id}
                                      index={index}
                                      isDragDisabled={dndDisabled}
                                    >
                                      {(provided$, snapshot$) => (
                                        <div
                                          role="row"
                                          tabIndex={0}
                                          /* eslint-disable-next-line max-len */
                                          onMouseDown={(e) => { this.handleEvent(e, item.bid.emp_id); }}
                                          onMouseUp={this.handleEvent}
                                          ref={provided$.innerRef}
                                          {...provided$.draggableProps}
                                          {...provided$.dragHandleProps}
                                          style={getItemStyle(
                                            snapshot$.isDragging,
                                            provided$.draggableProps.style,
                                          )}
                                          className={snapshot$.isDragging ? 'is-dragging' : ''}
                                        >
                                          {item.content}
                                          <BidderRankings
                                            perdet={item.bid.emp_id}
                                            cp_id={id}
                                            is_dragging={snapshot.isDraggingOver}
                                            is_mouse_down={this.state.isMouseDown}
                                            mouse_down_emp={this.state.mouseDownEmp}
                                          />
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </tbody>
                        </table>
                    }
                  </>
              )
          }
        </DragDropContext>
      </div>
    );
  }
}

PositionManagerBidders.propTypes = {
  bids: PropTypes.arrayOf(PropTypes.shape({})),
  bidCycle: PropTypes.shape({}),
  bidsIsLoading: PropTypes.bool,
  onSort: PropTypes.func,
  onFilter: PropTypes.func,
  ranking: PropTypes.arrayOf(PropTypes.shape({})),
  setRanking: PropTypes.func,
  filtersSelected: PropTypes.bool,
  filters: PropTypes.shape({
    handshake_code: PropTypes.string,
    ordering: PropTypes.string,
  }),
  allBids: PropTypes.arrayOf(PropTypes.shape({})),
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isLocked: PropTypes.bool,
  hasBureauPermission: PropTypes.bool,
  hasPostPermission: PropTypes.bool,
  classifications: CLASSIFICATIONS,
  hasHsReg: PropTypes.bool,
};

PositionManagerBidders.defaultProps = {
  bids: [],
  bidCycle: {},
  bidsIsLoading: false,
  onSort: EMPTY_FUNCTION,
  onFilter: EMPTY_FUNCTION,
  ranking: [],
  setRanking: EMPTY_FUNCTION,
  filtersSelected: false,
  filters: {},
  allBids: [],
  isLocked: false,
  hasBureauPermission: false,
  hasPostPermission: false,
  classifications: [],
  hasHsReg: false,
};

export default PositionManagerBidders;
