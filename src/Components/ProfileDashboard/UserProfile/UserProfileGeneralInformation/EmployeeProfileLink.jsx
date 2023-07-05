import { Component } from 'react';
import swal from '@sweetalert/with-react';
import { USER_PROFILE } from 'Constants/PropTypes';
import InteractiveElement from 'Components/InteractiveElement';
import { isOnProxy } from 'utilities';
import InformationDataPoint from '../../InformationDataPoint';
import EmployeeProfileModal from './EmployeeProfileModal';

class EmployeeProfileLink extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { userProfile } = this.props;
    const emp_profile_urls = userProfile?.employee_profile_url;

    let url$ = emp_profile_urls?.internal || emp_profile_urls?.internalRedacted;
    if (isOnProxy()) {
      url$ = emp_profile_urls?.external || emp_profile_urls?.externalRedacted;
    }

    const openPdf = () => swal({
      title: 'Employee Profile Report:',
      button: false,
      className: 'modal-1300',
      content: (
        <EmployeeProfileModal
          url={url$}
        />
      ),
    });

    return (
      <InformationDataPoint
        content={
          <InteractiveElement
            onClick={openPdf}
            type="a"
            title="Download Employee Profile PDF"
          >
            Employee Profile
          </InteractiveElement>
        }
      />
    );
  }
}

EmployeeProfileLink.propTypes = {
  userProfile: USER_PROFILE.isRequired,
};

export default EmployeeProfileLink;
