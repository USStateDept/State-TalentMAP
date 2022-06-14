import { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import { fetchJWT, fetchUserToken } from 'utilities';
// mport api from '../../api';

class RadioList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      copied: false,
    };
  }

  getTokens = () => {
    const token = fetchUserToken();
    const jwt = fetchJWT();
    const json = {
      token, jwt,
    };
    return JSON.stringify(json, undefined, 2);
  }

  fetchUserInfo = () => {
    // get role here
    // const getBureauPermissions = () => api().get('/fsbid/employee/bureau_permissions/');
    // const getOrgPermissions = () => api().get('/fsbid/employee/org_permissions/');

    // i think this is where promise stuff goes
  }

  render() {
    const tokens = this.getTokens();
    return (
      <div className="usa-grid-full favorite-positions-container profile-content-inner-container">
        <div className="usa-grid-full favorites-top-section">
          <div className="favorites-title-container">
            <ProfileSectionTitle title="Settings" icon="cogs" />
          </div>
        </div>
        <div className="usa-grid-full">
          <p>
            Use this page to copy your auth tokens for troubleshooting. Click the button below to
            copy your auth token to your clipboard. Do not share this for any reason besides
            troubleshooting by the TalentMAP or Help Desk teams.
          </p>
          <pre style={{ width: 500 }}>
            <span style={{ backgroundColor: 'white' }}>
              {tokens}
            </span>
          </pre>
          <CopyToClipboard
            text={tokens}
            onCopy={() => this.setState({ copied: true })}
          >
            <button>Copy to clipboard</button>
          </CopyToClipboard>
          {this.state.copied ? <span>Copied!</span> : null}
        </div>
        <div>
          Roles
          <div>
            Role 1
            Role 2
            Role 3
          </div>
        </div>
        <div>
          Bureau Permissions
          <div>
            Permission 1
            Permission 2
            Permission 3
          </div>
        </div>
        <div>
          Org Permissions
          <div>
            Permission 1
            Permission 2
            Permission 3
          </div>
        </div>
      </div>
    );
  }
}

export default RadioList;
