const HrOnlineIFrame = env => {
  const url = `https://gtm${env}hronline-usdos.msappproxy.net/${env}/hrdata/handshakechild.html`;
  return (
    <iFrame src={url} loading="eager" hidden />
  );
};

export default HrOnlineIFrame;

