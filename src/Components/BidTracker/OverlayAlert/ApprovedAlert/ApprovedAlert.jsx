import StaticDevContent from '../../../StaticDevContent';

// TODO - need to add PCS Travel link
const ApprovedAlert = () => (
  <div className="bid-tracker-alert-container bid-tracker-alert-container--approved">
    <div className="top-text">
      {"You've been"} <strong>approved</strong> for this position!
    </div>
    <div>
      <StaticDevContent>
        <button className="tm-button-transparent">Prepare for Next Steps</button>
      </StaticDevContent>
    </div>
    <div className="sub-text">
      This link will take you to PCS Travel
    </div>
  </div>
);

export default ApprovedAlert;
