import PropTypes from 'prop-types';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';
import { get } from 'lodash';

const AgendaLeg = props => {
  const {
    leg,
    legNum,
    onClose,
  } = props;

  // eslint-disable-next-line no-unused-vars
  const onClose$ = meow => {
    onClose(meow);
  };


  return (
    <>
      <div className={`grid-col-${legNum} grid-row-1`}>
        {get(leg, 'pos_title')}
      </div>
      <div className={`grid-col-${legNum} grid-row-2`}>
        {get(leg, 'pos_num')}
      </div>
      <div className={`grid-col-${legNum} grid-row-3`}>
        {get(leg, 'grade')}
      </div>
      <div className={`grid-col-${legNum} grid-row-4`}>
        {get(leg, 'language')}
      </div>
      <div className={`grid-col-${legNum} grid-row-5`}>
        {get(leg, 'org')}
      </div>
      <div className={`grid-col-${legNum} grid-row-6`}>
        {get(leg, 'eta')}
      </div>
      <div className={`grid-col-${legNum} grid-row-7`}>
        {get(leg, 'ted')}
      </div>
      <div className={`grid-col-${legNum} grid-row-8`}>
        {get(leg, 'tod')}
      </div>
      <div className={`grid-col-${legNum} grid-row-9`}>
        {get(leg, 'action')}
      </div>
      <div className={`grid-col-${legNum} grid-row-10`}>
        {get(leg, 'travel')}
      </div>
    </>
  );
};

AgendaLeg.propTypes = {
  leg: PropTypes.shape({}),
  legNum: PropTypes.number.isRequired,
  onClose: PropTypes.func,
};

AgendaLeg.defaultProps = {
  leg: {},
  onClose: EMPTY_FUNCTION,
};

export default AgendaLeg;
