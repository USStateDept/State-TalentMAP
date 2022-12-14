import PropTypes from 'prop-types';

const HrOnlineIFrame = ({ env }) => {
  const url = `https://gtm${env}hronline-usdos.msappproxy.net/${env}/hrdata/handshakechild.html`;
  return (
    <iFrame src={url} loading="eager" title="hronline-hs" hidden />
  );
};

HrOnlineIFrame.propTypes = {
  env: PropTypes.string.isRequired,
};

export default HrOnlineIFrame;

