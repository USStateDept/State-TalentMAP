import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import FA from 'react-fontawesome';
import SectionTitle from '../SectionTitle';
import CheckboxList from '../../BidderPortfolio/CheckboxList';
import { CLASSIFICATIONS, CLIENT_CLASSIFICATIONS } from '../../../Constants/PropTypes';
import TestComp from '../../ProfileDashboard/TestComp/TestComp';

const Classifications = ({ classifications, clientClassifications, isLoading, showComp,
  setShowComp }) => (
  <div className="usa-grid-full profile-section-container updates-container">
    <div className="usa-grid-full section-padded-inner-container">
      <div className="usa-width-one-whole">
        <SectionTitle title="Bidder Classifications" icon="tasks" />
      </div>
      <div className="usa-width-one-whole">
        <CheckboxList
          list={classifications}
          clientClassifications={clientClassifications}
          id="updates"
        />
      </div>
    </div>
    {
      !isLoading &&
      <div className="section-padded-inner-container small-link-container view-more-link-centered">
        <FA
          name="pencil"
          onClick={() => setShowComp(!showComp)}
        /> Edit Classifications
      </div>
    }
    <div>
      <TestComp />
    </div>
  </div>
);

Classifications.propTypes = {
  classifications: CLASSIFICATIONS,
  clientClassifications: CLIENT_CLASSIFICATIONS,
  isLoading: PropTypes.bool,
  showComp: PropTypes.bool,
  setShowComp: PropTypes.bool,
};

Classifications.defaultProps = {
  classifications: [],
  clientClassifications: [],
  isLoading: false,
  showComp: false,
  setShowComp: '',
};

export default Classifications;
