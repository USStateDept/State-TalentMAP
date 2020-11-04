import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { get, isEqual, keys, orderBy } from 'lodash';
import FA from 'react-fontawesome';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Skeleton from 'react-loading-skeleton';
import { formatDate, move } from 'utilities';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import { NO_GRADE, NO_END_DATE } from 'Constants/SystemMessages';
import { BUREAU_BIDDER_SORT, BUREAU_BIDDER_FILTERS } from 'Constants/Sort';
import SelectForm from 'Components/SelectForm';
import Alert from 'Components/Alert';
import InteractiveElement from 'Components/InteractiveElement';
import MailToButton from '../../MailToButton';
import { tertiaryCoolBlueLight, tertiaryCoolBlueLightest } from '../../../sass/sass-vars/variables';

const getItemStyle = (isDragging, draggableStyle) => {
  const border = isDragging ? '1px solid black' : 'none';
  return {
  // some basic styles to make the items look a bit nicer
    userSelect: 'none',

    // Make sure all border css is overridden
    borderTop: border,
    borderBottom: border,
    borderRight: border,
    borderLeft: border,

    // styles we need to apply on draggables
    ...draggableStyle,
  };
};

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? tertiaryCoolBlueLightest : tertiaryCoolBlueLight,
  maxHeight: 325,
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
  const match = ranking.find(f => +f.bidder_perdet === m.emp_id);
  if (match) {
    return null;
  }
  return m;
}).filter(f => f);

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
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.bidsIsLoading) {
      this.setState({ hasLoaded: true });
    }
    this.setState({
      shortList: this.getItems(rankedBids(nextProps.allBids, nextProps.ranking), 'shortList', nextProps),
      unranked: this.getItems(unrankedBids(nextProps.bids, nextProps.ranking), 'unranked', nextProps),
    });
  }

  // Logic to check that either one of the lists updated, or a manually triggered (drag or rank)
  // action took place. If so, re-calculate the lists to get the ranking dropdowns to re-render.
  // If the ranking change was triggered by the user, call this.props.setRanking.
  componentDidUpdate(prevProps, prevState) {
    const { rankingUpdate, shortList, unranked } = this.state;

    const shortListUpdated = !isEqual(
      shortList.map(m => m.emp_id), prevState.shortList.map(m => m.emp_id));

    const unrankedUpdated = !isEqual(
      unranked.map(m => m.emp_id), prevState.unranked.map(m => m.emp_id));

    const rankingUpdatedByUser = !isEqual(rankingUpdate, prevState.rankingUpdate);

    if (shortListUpdated || unrankedUpdated || rankingUpdatedByUser) {
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
    const formattedTed = ted ? formatDate(ted) : NO_END_DATE;
    const sections = {
      RetainedSpace: type === 'unranked' ? 'Unranked' :
        <select name="ranking" value={iter} onChange={a => { this.setState({ rankingUpdate: Date.now(), shortList: move(this.state.shortList, iter, a.target.value) }); }}>
          {[...Array(len).keys()]
            .map((e) => (<option
              key={e}
              value={e}
            >{e + 1}</option>))}
        </select>,
      Name: (<Link to={`/profile/public/${m.emp_id}/bureau`}>{get(m, 'name')}</Link>),
      Skill: get(m, 'skill'),
      Grade: get(m, 'grade', NO_GRADE),
      Language: get(m, 'language'),
      TED: formattedTed,
      CDO: get(m, 'cdo.email') ? <MailToButton email={get(m, 'cdo.email')} textAfter={get(m, 'cdo.name')} /> : 'N/A',
    };

    if (props.bidsIsLoading) {
      keys(sections).forEach(k => {
        sections[k] = <Skeleton />;
      });
    }

    const tableRows = (
      <tr>
        {keys(sections).map(i => (
          <td>{sections[i]}</td>
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

    /**
       * A semi-generic way to handle multiple lists. Matches
       * the IDs of the droppable container to the names of the
       * source arrays stored in the state.
     */
    id2List = {
      droppable: 'shortList',
      droppable2: 'unranked',
    };

    render() {
      const { bids, bidsIsLoading, filtersSelected, filters } = this.props;
      const { hasLoaded, shortListVisible, unrankedVisible } = this.state;

      const tableHeaders = ['Ranking', 'Name', 'Skill', 'Grade', 'Language', 'TED', 'CDO'].map(item => (
        <th scope="col">{item}</th>
      ));

      return (
        <div className="usa-width-one-whole position-manager-bidders">
          <DragDropContext onDragEnd={this.onDragEnd}>
            {
              // >:)
              // eslint-disable-next-line no-nested-ternary
              bidsIsLoading && !hasLoaded ? 'Loading...' :
                (
                  !bids.length && !filtersSelected && !bidsIsLoading ?
                    <Alert type="info" title="There are no bids on this position" />
                    :
                    <>
                      <div className="list-toggle-container">
                        <InteractiveElement title="Toggle visibility" onClick={() => this.toggleVisibility('shortListVisible')}><FA name={shortListVisible ? 'chevron-down' : 'chevron-up'} /></InteractiveElement>
                        <h3>Short List ({this.state.shortList.length})</h3>
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
                            <Droppable droppableId="droppable">
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
                                      isDragDisabled={bidsIsLoading}
                                    >
                                      {(provided$, snapshot$) => (
                                        <div
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

                      <div className="bidders-controls">
                        <SelectForm
                          id="sort"
                          label="Sort by:"
                          defaultSort={filters.ordering || ''}
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
                            <Droppable droppableId="droppable2">
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
                                      isDragDisabled={bidsIsLoading}
                                    >
                                      {(provided$, snapshot$) => (
                                        <div
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
};

PositionManagerBidders.defaultProps = {
  bids: [],
  bidsIsLoading: false,
  onSort: EMPTY_FUNCTION,
  onFilter: EMPTY_FUNCTION,
  ranking: [],
  setRanking: EMPTY_FUNCTION,
  filtersSelected: false,
  filters: {},
  allBids: [],
};

export default PositionManagerBidders;
