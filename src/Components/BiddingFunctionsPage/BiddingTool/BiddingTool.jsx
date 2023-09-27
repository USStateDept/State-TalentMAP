import { Link, withRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { Column, Row } from 'Components/Layout';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import BiddingToolCard from './BiddingToolCard/BiddingToolCard';
import { biddingTools } from '../../../actions/biddingTool';
import Spinner from '../../Spinner/Spinner';
import { userHasPermissions } from '../../../utilities';


const BiddingTool = (props) => {
  const id = props.match?.params?.id ?? false;
  const location = props.location?.pathname;

  const appendedLocation = () => {
    const lastChar = location.charAt(location.length - 1);
    if (lastChar === '/') return location;
    return `${location}/`;
  };

  const dispatch = useDispatch();

  const userProfile = useSelector(state => state.userProfile);
  const isSuperUser = userHasPermissions(['superuser'], userProfile.permission_groups);

  const results = useSelector(state => state.biddingTools) ?? [];
  const resultsIsLoading = useSelector(state => state.biddingToolsFetchDataLoading);

  useEffect(() => {
    dispatch(biddingTools());
  }, []);

  if (id) {
    return (
      <div className="bidding-tool-page position-search">
        <div className="usa-grid-full position-search--header">
          <ProfileSectionTitle title="Bidding Tool" icon="cog" />
        </div>
        <div className="position-search--results">
          <BiddingToolCard id={id} location={location} />
        </div>
      </div>
    );
  }
  return (resultsIsLoading ?
    <Spinner type="bidding-tool" size="small" /> :
    <div className="bidding-tool-page position-search">
      <div className="usa-grid-full position-search--header">
        <ProfileSectionTitle title="Bidding Tool" icon="cog" />
      </div>
      <div className="position-search--results">
        <div className="usa-grid-full page-heading">
          <span>
            Search for a Bidding Tool
          </span>
          <span>
            {isSuperUser ?
              'Search for an existing Bidding Tool or create a new one.' :
              'Search for an existing Bidding Tool.'
            }
          </span>
        </div>
        {isSuperUser &&
          <div className="usa-grid-full controls-container">
            <Link className="standard-add-button" to={`${appendedLocation()}new`}>
              <FA className="fa-solid fa-plus" name="new-bidding-tool" />
              <p>Create New Bidding Tool</p>
            </Link>
          </div>
        }
        {results?.map(d => (
          <Row fluid className="cycle-search-card box-shadow-standard">
            <Row fluid className="cyc-card--row">
              <Column columns={3}>
                {d.post_code}
              </Column>
              <Column columns={12} className="cyc-card--middle-cols">
                {d.post}
              </Column>
              <Column columns={3} className="cyc-card--link-col">
                <span>
                  <Link to={appendedLocation() + d.id}>
                    {isSuperUser ? 'View / Edit' : 'View'}
                  </Link>
                </span>
              </Column>
            </Row>
          </Row>
        ))}
      </div>
    </div>
  );
};

BiddingTool.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
};

BiddingTool.defaultProps = {
  match: {},
  location: {},
};

export default withRouter(BiddingTool);
