import PropTypes from 'prop-types';
import CandidateManagerTable from '../CandidateManagerTable';
import ProfileSectionTitle from '../../ProfileSectionTitle';

const CandidateManager = props => {
  // eslint-disable-next-line no-console
  console.log('fine', props.userSelections);
  return (
    <div
      className={'usa-grid-full profile-content-inner-container'}
    >
      <div className="usa-grid-full">
        <ProfileSectionTitle title="Candidate Manager" icon="exclamation-triangle" />
      </div>
      <div>
        <CandidateManagerTable />
      </div>
    </div>
  );
};

CandidateManager.propTypes = {
  userSelections: PropTypes.shape({}),
};

CandidateManager.defaultProps = {
  userSelections: {},
};

export default CandidateManager;
