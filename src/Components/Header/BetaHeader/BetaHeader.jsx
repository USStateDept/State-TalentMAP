import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { get } from 'lodash';
import PermissionsWrapper from '../../../Containers/PermissionsWrapper';
import EditContentButton from '../../EditContentButton';
import TextEditor from '../../TextEditor';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';
import { homeBannerContentFetchData, homeBannerContentPatchData } from '../../../actions/homeBannerContent';
import { focusById, userHasPermissions } from '../../../utilities';

const EDIT_BUTTON_ID = 'edit-home-content';
const SUBMIT_BUTTON_ID = 'submit-home-content';

class BetaHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorVisible: false,
    };
  }

  UNSAFE_componentWillMount() {
    this.getData();
  }

  getData() {
    this.props.fetchData();
  }

  patchData = data => {
    this.props.patchData(data);
  };

  toggleEditor = () => {
    const { editorVisible } = this.state;
    this.setState({ editorVisible: !editorVisible }, () => {
      const elToFocus = this.state.editorVisible ? SUBMIT_BUTTON_ID : EDIT_BUTTON_ID;
      focusById(elToFocus, 0);
    });
  };

  submit = data => {
    this.props.patchData(data);
    this.setState({ editorVisible: false });
  };

  cancel = () => {
    this.setState({ editorVisible: false });
  };

  render() {
    const { data, isLoading, userProfile } = this.props;
    const { editorVisible } = this.state;
    const permissionsNeeded = ['superuser'];
    const userPermissions = get(userProfile, 'permission_groups', []);
    const hasPermissions = userHasPermissions(permissionsNeeded, userPermissions);

    const shouldDisplayHeader = data || hasPermissions;

    const header = (
      <div className="usa-banner tm-beta-header">
        <div className="usa-grid usa-banner-inner padded-main-content">
          {
            !editorVisible &&
              <div className="loader">
                <FontAwesome name="gears" />
                <SkeletonTheme color="#FAD980" highlightColor="#FDEFCC">
                  {!isLoading ? data : <Skeleton width="50%" duration={1.8} />}
                </SkeletonTheme>
              </div>
          }
          {
            !isLoading && !editorVisible &&
              <PermissionsWrapper permissions="superuser">
                <EditContentButton onToggle={this.toggleEditor} id={EDIT_BUTTON_ID} />
              </PermissionsWrapper>
          }
          {
            editorVisible &&
              <TextEditor
                initialText={data}
                cancel={this.cancel}
                onSubmitText={this.submit}
                submitProps={{ id: SUBMIT_BUTTON_ID }}
              />
          }
        </div>
      </div>
    );
    return (
      shouldDisplayHeader ? header : null
    );
  }
}

BetaHeader.propTypes = {
  data: PropTypes.string,
  isLoading: PropTypes.bool,
  fetchData: PropTypes.func,
  patchData: PropTypes.func,
  userProfile: PropTypes.shape({}),
};

BetaHeader.defaultProps = {
  data: '',
  hasErrored: false,
  isLoading: false,
  fetchData: EMPTY_FUNCTION,
  patchData: EMPTY_FUNCTION,
  userProfile: {},
};

const mapStateToProps = state => ({
  data: state.homeBannerContent,
  hasErrored: state.homeBannerContentHasErrored,
  isLoading: state.homeBannerContentIsLoading,
  userProfile: state.userProfile,
});

export const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(homeBannerContentFetchData()),
  patchData: data => dispatch(homeBannerContentPatchData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BetaHeader);
