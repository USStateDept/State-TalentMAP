import Spinner from '../Spinner';

const Splash = () => (
  <div className="usa-grid-full" style={{ padding: '3em', height: '100vh' }}>
    <h1 style={{ textAlign: 'center', fontSize: 28 }}>Loading TalentMAP...</h1>
    <Spinner style={{ paddingLeft: 5 }} size="small" />
  </div>
);

export default Splash;
