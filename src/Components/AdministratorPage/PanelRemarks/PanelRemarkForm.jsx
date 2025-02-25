import PropTypes from 'prop-types';

const PanelRemarkForm = ({ match }) => {
  const { mode, id } = match.params;
  console.log(mode, id);

  return (
    <div>
      <h1>Panel Remark Form</h1>
      {mode}
    </div>
  );
};

PanelRemarkForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      mode: PropTypes.string.isRequired,
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default PanelRemarkForm;
