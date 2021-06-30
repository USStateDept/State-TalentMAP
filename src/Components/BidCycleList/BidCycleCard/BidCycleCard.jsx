/* eslint-disable no-underscore-dangle */
import { Component } from 'react';
import { get, identity, pickBy } from 'lodash';
import DatePicker from 'react-datepicker';
import LoadingText from 'Components/LoadingText';
import { Card, Column, Row } from '../../Layout';
import DefinitionList, { Definition } from '../../DefinitionList';
import { BID_CYCLE } from '../../../Constants/PropTypes';
import { formatDate } from '../../../utilities';
import api from '../../../api';

const NO_DATE = 'None listed';
const NO_NAME = 'None listed (This may not be an active bid cycle)';

const getCycleInfo = (item, key) => {
  const defaults = {
    id: '',
    name: NO_NAME,
    handshake_allowed_date: '',
  };

  let item$ = get(item, key, defaults[key]);

  if ((/date/).test(key)) {
    item$ = item$ ? formatDate(item$, 'M.D.YYYY hh:mm') : NO_DATE;
  }

  return item$;
};

class BidCycleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editActive: false,
      isLoading: false,
      hasErrored: false,
      data: null,
      date: props.cycle.handshake_allowed_date || new Date(),
      date$: null,
      hasUpdated: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.cycle.handshake_allowed_date !== this.props.cycle.handshake_allowed_date) {
      this.setState({ date: nextProps.cycle.handshake_allowed_date });
    }
  }

  render() {
    const { cycle } = this.props;
    const { data, date, date$, editActive, isLoading, hasErrored, hasUpdated } = this.state;

    const cycle$$ = {
      ...pickBy(cycle, identity),
      ...pickBy(data, identity),
    };

    if (hasUpdated) {
      cycle$$.handshake_allowed_date = date$;
    }

    const { _id: id$ } = cycle$$;

    const cycle$ = {
      id: getCycleInfo(cycle$$, 'id'),
      name: getCycleInfo(cycle$$, 'name'),
      deadline: getCycleInfo(cycle$$, 'handshake_allowed_date'),
    };

    const patch = (isClear = false) => {
      this.setState({ isLoading: true, hasErrored: false });
      const method = cycle$$._id || data?.id ? 'patch' : 'post';
      const body = { handshake_allowed_date: date };
      if (method === 'post') {
        body.cycle_id = cycle.id;
      }
      if (isClear) {
        body.handshake_allowed_date = null;
      }
      const url = `/bidhandshakecycle/${method === 'post' ? '' : `${cycle$$._id}/`}`;
      api()[method](url, body)
        .then((response) => {
          const { data: data$ } = response;
          this.setState({
            data: {
              ...data$,
              _id: data$.id,
              id: data$.cycle_id,
              handshake_allowed_date: data$.handshake_allowed_date,
            },
            isLoading: false,
            hasErrored: false,
            editActive: false,
            date$: data$.handshake_allowed_date,
            hasUpdated: true,
          });
        })
        .catch(() => {
          this.setState({ isLoading: false, hasErrored: true });
        });
    };

    const time = new Date(date);

    return (
      <Card>
        <Row fluid>
          <Column columns={12}>
            {
              editActive ?
                <>
                  <div style={{ display: 'block' }}>
                    <DatePicker
                      selected={time}
                      onChange={d => { this.setState({ date: d }); }}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                    />
                  </div>
                  <button className="usa-button-secondary" onClick={() => patch(false)}>Submit</button>
                  <button className="usa-button-secondary" onClick={() => patch(true)}>Remove Date</button>
                </>
                :
                <DefinitionList>
                  <Definition term="In Database" definition={id$ ? 'Yes' : 'No'} />
                  <Definition term="ID" definition={cycle$.id} />
                  <Definition term="Name" definition={cycle$.name} />
                  <Definition term="Handshake Reveal Date" definition={cycle$.deadline} />
                </DefinitionList>
            }
            <button onClick={() => this.setState({ editActive: !editActive })}>{ editActive ? 'Close' : 'Edit Reveal Date' }</button>
            { editActive && isLoading && <LoadingText /> }
            { editActive && !isLoading && hasErrored && 'Error. Try again'}
          </Column>
        </Row>
      </Card>
    );
  }
}

BidCycleCard.propTypes = {
  cycle: BID_CYCLE,
};

BidCycleCard.defaultProps = {
  cycle: {
    name: '',
    cycle_deadline_date: null,
    cycle_end_date: null,
    cycle_start_date: null,
    active: true,
  },
};

export default BidCycleCard;
/* eslint-enable no-underscore-dangle */
