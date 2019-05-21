import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import PermissionsWrapper from '../../../Containers/PermissionsWrapper';
import EditContentButton from '../../EditContentButton';
import TextEditor from '../../TextEditor';
import { EMPTY_FUNCTION } from '../../../Constants/PropTypes';
import { homeBannerContentFetchData, homeBannerContentPatchData } from '../../../actions/homeBannerContent';
import { focusById } from '../../../utilities';

const EDIT_BUTTON_ID = 'edit-home-content';
const SUBMIT_BUTTON_ID = 'submit-home-content';

class BetaHeader extends Component {
  constructor(props) {
    super(props);
    this.patchData = this.patchData.bind(this);
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
    this.toggleEditor = this.toggleEditor.bind(this);
    this.state = {
      editorVisible: false,
    };
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    this.props.fetchData();
  }

  patchData(data) {
    this.props.patchData(data);
  }

  toggleEditor() {
    const { editorVisible } = this.state;
    this.setState({ editorVisible: !editorVisible }, () => {
      const elToFocus = this.state.editorVisible ? SUBMIT_BUTTON_ID : EDIT_BUTTON_ID;
      focusById(elToFocus, 0);
    });
  }

  submit(data) {
    this.props.patchData(data);
    this.setState({ editorVisible: false });
  }

  cancel() {
    this.setState({ editorVisible: false });
  }

  render() {
    const { data, isLoading } = this.props;
    const { editorVisible } = this.state;
    return (
      <div className="usa-banner tm-beta-header">
        <div className="usa-grid usa-banner-inner padded-main-content">
          {
            !editorVisible &&
              <div className="loader">
                <FontAwesome name="gears" />
                <SkeletonTheme color="#FAD980" highlightColor="#FDEFCC">
                  {data || <Skeleton width="50%" duration={1.8} />}
                </SkeletonTheme>
              </div>
          }
          {
            !isLoading && !editorVisible &&
              <PermissionsWrapper permissions="bidder">
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
  }
}

BetaHeader.propTypes = {
  data: PropTypes.string,
  isLoading: PropTypes.bool,
  fetchData: PropTypes.func,
  patchData: PropTypes.func,
};

BetaHeader.defaultProps = {
  data: '',
  hasErrored: false,
  isLoading: false,
  fetchData: EMPTY_FUNCTION,
  patchData: EMPTY_FUNCTION,
};

const mapStateToProps = state => ({
  data: state.homeBannerContent,
  hasErrored: state.homeBannerContentHasErrored,
  isLoading: state.homeBannerContentIsLoading,
});

export const mapDispatchToProps = dispatch => ({
  fetchData: () => dispatch(homeBannerContentFetchData()),
  patchData: data => dispatch(homeBannerContentPatchData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BetaHeader);
