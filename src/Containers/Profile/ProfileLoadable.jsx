import React from 'react';
import createLoader from '../../Components/Loadable';

export const path = () => import('./Profile');

const Profile = createLoader({ path, placeholder: <div style={{ height: '60vh' }} /> });

const ProfileLoadable = ({ ...rest }) => (
  <Profile {...rest} />
);

export default ProfileLoadable;
