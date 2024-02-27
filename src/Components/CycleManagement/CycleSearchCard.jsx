import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Column, Row } from 'Components/Layout';
import { formatDate, userHasPermissions } from 'utilities';

const CycleSearchCard = (props) => {
  const {
    id,
    name,
    status,
    begin_date,
    end_date,
    excl_position,
    post_view,
    isAO,
  } = props;

  const cycleLink = `/profile/${isAO ? 'ao' : 'bureau'}/assginmentcycle/${id}`;
  const cycleLinkPositions = `/profile/${isAO ? 'ao' : 'bureau'}/cyclepositionsearch/${id}`;
  const userProfile = useSelector(state => state.userProfile);
  const isSuperUser = userHasPermissions(['superuser'], userProfile?.permission_groups);

  return (
    <Row fluid className="cycle-search-card box-shadow-standard">
      <Row fluid className="cyc-card--row">
        <Column columns={3}>
          {isSuperUser // only Admin?
            ? <Link to={cycleLink}>
              <div>{ name }</div>
            </Link>
            : <div>{ name }</div>
          }
        </Column>
        <Column columns={12} className="cyc-card--middle-cols">
          <Column>
            {`Cycle Start: ${begin_date ? formatDate(begin_date) : ''}`}
          </Column>
          <Column>
            {`Bid Due: ${end_date ? formatDate(end_date) : ''}`}
          </Column>
          <Column>
            {`Status: ${status}`}
          </Column>
          <Column>
            {`Exluded: ${excl_position}`}
          </Column>
          <Column>
            {`Post View: ${post_view}`}
          </Column>
        </Column>
        <Column columns={3} className="cyc-card--link-col">
          <span>
            <Link to={cycleLinkPositions}>
                View Cycle Positions
            </Link>
          </span>
        </Column>
      </Row>
    </Row>
  );
};

CycleSearchCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  status: PropTypes.string,
  begin_date: PropTypes.string,
  end_date: PropTypes.string,
  excl_position: PropTypes.string,
  post_view: PropTypes.string,
  isAO: PropTypes.bool,
};

CycleSearchCard.defaultProps = {
  name: '',
  status: '',
  begin_date: '',
  end_date: null,
  excl_position: null,
  post_view: '',
  isAO: false,
};

export default CycleSearchCard;
