import PropTypes from 'prop-types';
import swal from '@sweetalert/with-react';
import CheckBox from '../../CheckBox/CheckBox';


const EditBureauExceptionList = (props) => {
  const { details, seasonInfo, id } = props;

  const submit = (e) => {
    e.preventDefault();
    swal.close();
    console.log(details, seasonInfo, id);
    // Doing nothing for now but closing.
  };

  const cancel = (e) => {
    e.preventDefault();
    swal.close();
  };
  const data = ['AO', 'FB', 'EO', 'AS', 'FG', 'UO'];
  return (
    <div>
      <form className="bid-seasons-form">
        <div>
          <label htmlFor="status">Description</label>
          {data.map((item) => (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <CheckBox id={item} label={item} />
            </div>
          ))}
        </div>
        <button onClick={cancel}>Cancel</button>
        <button onClick={submit} type="submit">Save</button>
      </form>
    </div>
  );
};

EditBureauExceptionList.propTypes = {
  id: PropTypes.string.is,
  details: PropTypes.shape({
    formattedCreated: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    panelCutOff: PropTypes.string,
  }),
  seasonInfo: PropTypes.shape({
    bid_seasons_name: PropTypes.string,
    bid_seasons_category: PropTypes.string,
    bid_seasons_begin_date: PropTypes.string,
    bid_seasons_panel_cutoff: PropTypes.string,
    bid_seasons_end_date: PropTypes.string,
    bid_seasons_future_vacancy: PropTypes.string,
    description: PropTypes.string,
  }),
};


EditBureauExceptionList.defaultProps = {
  id: '',
  details: {
    formattedCreated: '',
    startDate: '',
    endDate: '',
    panelCutOff: '',
  },
  seasonInfo: {
    bid_seasons_name: '',
    bid_seasons_category: '',
    bid_seasons_begin_date: '',
    bid_seasons_panel_cutoff: '',
    bid_seasons_end_date: '',
    bid_seasons_future_vacancy: '',
    description: '',
  },
};

export default EditBureauExceptionList;
