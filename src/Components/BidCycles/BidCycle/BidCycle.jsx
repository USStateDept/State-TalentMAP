import React from 'react';
import _ from 'lodash';
import { Row, Column, Card } from '../../Layout';
import DefinitionList, { Definition } from '../../DefinitionList';
import { BID_CYCLE } from '../../../Constants/PropTypes';
import { NO_BID_CYCLE, NO_DATE } from '../../../Constants/SystemMessages';
import { formatDate } from '../../../utilities';

const getCycleInfo = (item, key) => {
  const defaults = {
    name: NO_BID_CYCLE,
    cycle_start_date: NO_DATE,
    cycle_end_date: NO_DATE,
    cycle_deadline_date: NO_DATE,
  };

  let item$ = _.get(item, key, defaults[key]);

  if (key === 'name') {
    // 1. Splits a string like '<name> YYYY-MM-MM HH:MM:SS.000000+00:00' into an array
    // 2. Slices the array and takes first item in the list
    // 3. Joins it back to a string
    item$ = _.chain(item$)
      .split(' ')
      .first()
      .value();
  }

  if ((/date/).test(key)) {
    item$ = formatDate(item$, 'M.D.YYYY');
  }

  return item$;
};

const BidCycle = (props) => {
  const cycle = {
    name: getCycleInfo(props.cycle, 'name'),
    start: getCycleInfo(props.cycle, 'cycle_start_date'),
    end: getCycleInfo(props.cycle, 'cycle_end_date'),
    deadline: getCycleInfo(props.cycle, 'cycle_deadline_date'),
  };

  return (cycle ?
    <Card>
      <Row fluid>
        <Column columns="3">
          <DefinitionList>
            <Definition term="Name" definition={cycle.name} />
            <Definition term="Deadline Date" definition={cycle.deadline} />
          </DefinitionList>
        </Column>
        <Column columns="3">
          <DefinitionList>
            <Definition term="Start Date" definition={cycle.start} />
            <Definition term="End Date" definition={cycle.end} />
          </DefinitionList>
        </Column>
      </Row>
    </Card> :
    null
  );
};

BidCycle.propTypes = {
  cycle: BID_CYCLE,
};

BidCycle.defaultProps = {
  cycle: {
    name: '',
    cycle_deadline_date: null,
    cycle_end_date: null,
    cycle_start_date: null,
    active: true,
  },
};

export default BidCycle;
