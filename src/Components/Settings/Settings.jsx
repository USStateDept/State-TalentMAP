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

  // const user = useSelector(state => state.userProfile);
  const roles = useSelector(state => state.userProfile.permission_groups);
  const bureauPermissions = useSelector(state => state.userProfile.bureau_permissions);
  const orgPermissions = useSelector(state => state.userProfile.org_permissions);
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
          Please find below a list of roles and permissions that you have been
          assigned which will be used to help the
          TalentMAP team and Help Desk troubleshoot any issues that you may experience when
          using TalentMAP. If you do encounter an issue, please notify the Help Desk or the
          TalentMAP team with a screenshot of the error you are receiving as well as your
          roles, bureau permissions, and organization permissions.
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
        <table className="permissions-table">
          <tbody>
            <th className="permissions-table header">
              Roles
            </th>
            <tr>
              <ul>
                {
                  roles.map(role => (
                    <li>
                      {role}
                    </li>
                  ))
                }
              </ul>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table className="permissions-table">
          <tbody>
            <th className="permissions-table header">
              Bureau Permissions
            </th>
            <tr>
              <ul>
                {
                  bureauPermissions.map(item => (
                    <li>
                      {item.long_description}
                    </li>
                  ))
                }
              </ul>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table className="permissions-table">
          <tbody>
            <th className="permissions-table header">
              Organization Permissions
            </th>
            <tr>
              <ul>
                {
                  orgPermissions.map(item => (
                    <li>
                      {item.long_description}
                    </li>
                  ))
                }
              </ul>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RadioList;
