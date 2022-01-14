import { Component } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import PermissionsWrapper from 'Containers/PermissionsWrapper';
import { focusById } from 'utilities';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import MediaQuery from '../MediaQuery';
import EditContentButton from '../EditContentButton';
import Editor from './Editor';
import Spinner from '../Spinner';
import Alert from '../Alert';
import { SUBMIT_BUTTON_ID } from './Editor/Editor';

const EDIT_BUTTON_ID = 'edit-about-content';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorVisible: false,
    };
  }

  toggleEditor = () => {
    const { editorVisible } = this.state;
    this.setState({ editorVisible: !editorVisible }, () => {
      const elToFocus = this.state.editorVisible ? SUBMIT_BUTTON_ID : EDIT_BUTTON_ID;
      focusById(elToFocus, 1);
    });
  };

  submit = data => {
    this.props.patchData(data);
  };

  render() {
    const { data, isLoading, hasErrored } = this.props;
    const { editorVisible } = this.state;
    return (
      <div className="usa-grid-full content-container padded-main-content">
        <div className="usa-grid-full about-page">
          <MediaQuery breakpoint="screenSmMax" widthType="min">
            {matches => (
              <div>
                {
                  isLoading && !hasErrored &&
                    <Spinner type="homepage-position-results" size="big" />
                }
                {
                  !isLoading && hasErrored &&
                  <Alert type="error" title="Error loading Help page" messages={[{ body: 'Please try again.' }]} />
                }
                {
                  !isLoading &&
                  <div className={`${matches ? 'usa-width-one-half' : 'usa-width-three-fourths'} about-content`}>
                    {
                      !editorVisible &&
                        <PermissionsWrapper permissions={['superuser', 'helppage_editor']} minimum>
                          <EditContentButton onToggle={this.toggleEditor} id={EDIT_BUTTON_ID} />
                        </PermissionsWrapper>
                    }
                    {editorVisible ?
                      <Editor
                        cancel={this.toggleEditor}
                        submit={this.submit}
                        data={data}
                      /> :
                      <div>
                        <ReactMarkdown source={data} linkTarget="_blank" />
                        <a type="submit" role="button" href="mailto:TalentMAP@State.gov" className="tm-button-feedback">Email TalentMAP</a>
                      </div>
                    }
                  </div>
                }
              </div>
            )}
          </MediaQuery>
        </div>
      </div>
    );
  }
}

About.propTypes = {
  data: PropTypes.string,
  isLoading: PropTypes.bool,
  hasErrored: PropTypes.bool,
  patchData: PropTypes.func,
};

About.defaultProps = {
  data: '',
  isLoading: false,
  hasErrored: false,
  patchData: EMPTY_FUNCTION,
};

export default About;
