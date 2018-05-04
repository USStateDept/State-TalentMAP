import React from 'react';
import MediaQuery from 'react-responsive';
import { get } from 'lodash';
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

  let item$ = get(item, key, defaults[key]);

  if ((/date/).test(key)) {
    item$ = formatDate(item$, 'M.D.YYYY');
  }

  return item$;
};

const BidCycleCard = (props) => {
  const cycle = {
    name: getCycleInfo(props.cycle, 'name'),
    start: getCycleInfo(props.cycle, 'cycle_start_date'),
    end: getCycleInfo(props.cycle, 'cycle_end_date'),
    deadline: getCycleInfo(props.cycle, 'cycle_deadline_date'),
  };

  return (cycle ?
    <MediaQuery maxWidth="760px">
      {matches => (
        <Card>
          <Row fluid>
            <Column columns={(matches ? 12 : 3)}>
              <DefinitionList>
                <Definition term="Name" definition={cycle.name} />
                <Definition term="Deadline Date" definition={cycle.deadline} />
              </DefinitionList>
            </Column>
            <Column columns={(matches ? 12 : 3)}>
              <DefinitionList>
                <Definition term="Start Date" definition={cycle.start} />
                <Definition term="End Date" definition={cycle.end} />
              </DefinitionList>
            </Column>
          </Row>
        </Card>
      )}
    </MediaQuery> :
    null
  );
};

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
