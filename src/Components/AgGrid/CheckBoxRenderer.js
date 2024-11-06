import PropTypes from 'prop-types';
import CheckBox from '../CheckBox';

const CheckboxRenderer = (props) => {
  const { colDef, node, value } = props;
  /** make sure to create a unique id for each checkbox in your table with the format `${header.fieldName}_ID: <uniqueIDHere>,
      see MaintainELPositionsTable.jsx for an example`
    */
  const uniqueId = node.data[`${colDef.field}_ID`];

  const onCheckBoxClick = (checked) => {
    node.setDataValue(colDef.field, checked);
  };

  return (
    <CheckBox {...props} id={uniqueId} value={value} onCheckBoxClick={onCheckBoxClick} />
  );
};

CheckboxRenderer.propTypes = {
  colDef: PropTypes.shape({
    field: PropTypes.string.isRequired,
  }).isRequired,
  node: PropTypes.shape({
    setDataValue: PropTypes.func.isRequired,
    data: PropTypes.shape({}).isRequired,
  }).isRequired,
  value: PropTypes.bool.isRequired,
};

export default CheckboxRenderer;
