import Classifications from 'Components/ProfileDashboard/Classifications';
import { CLASSIFICATIONS, CLIENT_CLASSIFICATIONS } from 'Constants/PropTypes';

const RemarksGlossary = ({ classifications, clientClassifications }) => (
  <div className="usa-grid-full classifications-container">
    <Classifications
      classifications={classifications}
      clientClassifications={clientClassifications}
      hideTitle
    />
  </div>
);

RemarksGlossary.propTypes = {
  classifications: CLASSIFICATIONS,
  clientClassifications: CLIENT_CLASSIFICATIONS,
};

RemarksGlossary.defaultProps = {
  classifications: [],
  clientClassifications: [],
};

export default RemarksGlossary;
