import PropTypes from 'prop-types';
import Spinner from '../Spinner';

const Splash = props => (
  <div className="usa-grid-full" style={{ padding: '3em', height: '100vh' }}>
    <iframe src={props.url} title="hrauth-msapp" loading="eager" hidden />
    <h1 style={{ textAlign: 'center', fontSize: 28 }}>Loading TalentMAP...</h1>
    <Spinner style={{ paddingLeft: 5 }} size="small" />
  </div>
);

Splash.proptypes = {
  url: PropTypes.string.isRequired,
};

export default Splash;
