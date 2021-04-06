import Ribbon from '../Ribbon';

const CriticalNeed = ({ ...props }) => (
  <Ribbon icon="exclamation" text="Critical need" type="cn" {...props} />
);

export default CriticalNeed;
