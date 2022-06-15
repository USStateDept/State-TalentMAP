import { CopyToClipboard } from 'react-copy-to-clipboard';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import { fetchJWT, fetchUserToken } from 'utilities';
// import { get } from 'lodash';
import { useSelector } from 'react-redux';
import { useState } from 'react';
// import PropTypes from 'prop-types';
// import { USER_PROFILE } from '../../Constants/PropTypes';
// mport api from '../../api';

const RadioList = () => {
  const [copied, setCopied] = useState(false);
  // const [value, setValue] = useState('');

  const getTokens = () => {
    const token = fetchUserToken();
    const jwt = fetchJWT();
    const json = {
      token, jwt,
    };
    return JSON.stringify(json, undefined, 2);
  };

  const user = useSelector(state => state.userProfile);
  // const { userProfile } = this.props;
  // const name = get(userProfile, 'user.first_name');

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
            {getTokens()}
          </span>
        </pre>
        <CopyToClipboard
          text={getTokens()}
          onCopy={() => setCopied(true)}
        >
          <button>Copy to clipboard</button>
        </CopyToClipboard>
        {copied ? <span>Copied!</span> : null}
      </div>
      <div>
        Roles
        <div>
          {user.permission_groups}
        </div>
      </div>
      {/* <div>
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
      </div> */}
    </div>
  );
};

export default RadioList;
