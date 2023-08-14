import PropTypes from 'prop-types';
import { useLayoutEffect, useState } from 'react';

const HrOnlineIFrame = ({ env }) => {
  const domain = env.toLowerCase() === 'prd' ? '' : env;
  const [url, setUrl] = useState(`https://gtm${domain}hronline-usdos.msappproxy.net/${env}/HRData/api/v1/getuser`);

  useLayoutEffect(() => {
    setTimeout(() => {
      setUrl(`https://gtm${domain}hronline-usdos.msappproxy.net/${env}/hrdata/handshakechild.html`);
    }, 2000);
  }, []);

  return (
    <iframe src={url} loading="eager" title="hronline-hs" hidden />
  );
};

HrOnlineIFrame.propTypes = {
  env: PropTypes.string.isRequired,
};

export default HrOnlineIFrame;

