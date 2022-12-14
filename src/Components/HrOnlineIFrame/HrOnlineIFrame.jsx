import PropTypes from 'prop-types';

const HrOnlineIFrame = ({ env }) => {
  const url = `https://gtm${env}hronline-usdos.msappproxy.net/${env}/hrdata/handshakechild.html`;
  return (
    <iFrame src={url} loading="eager" hidden />
  );
};

HrOnlineIFrame.PropTypes = {
  env: PropTypes.string.isRequired,
};

export default HrOnlineIFrame;

