import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const HrOnlineIFrame = ({ env }) => {
  const [url, setUrl] = useState(`https://gtm${env}hronline-usdos.msappproxy.net/${env}/HRData/api/v1/getuser`);

  useEffect(() => {
    setTimeout(() => {
      setUrl(`https://gtm${env}hronline-usdos.msappproxy.net/${env}/hrdata/handshakechild.html`);
    }, 1000);
  }, []);

  return (
    <iframe src={url} loading="eager" title="hronline-hs" hidden />
  );
};

HrOnlineIFrame.propTypes = {
  env: PropTypes.string.isRequired,
};

export default HrOnlineIFrame;

