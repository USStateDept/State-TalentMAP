import { Component } from 'react';
import { get } from 'lodash';
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

    let url$ = get(userProfile, 'employee_profile_url.internal');
    if (isOnProxy()) {
      url$ = get(userProfile, 'employee_profile_url.external');
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
