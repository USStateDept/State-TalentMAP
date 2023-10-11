import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { positionClassifications, positionClassificationsEdit } from '../../../actions/positionClassifications';

const PositionClassification = (props) => {
  const { positionNumber, bureau } = props;

  const dispatch = useDispatch();

  const results = useSelector(state => state.positionClassifications);
  const isLoading = useSelector(state => state.positionClassificationsIsLoading);
  const pc = results?.positionClassifications ?? [];
  const cs = results?.classificationSelections ?? [];

  useEffect(() => {
    if (positionNumber) {
      dispatch(positionClassifications(positionNumber));
    }
  }, [positionNumber]);

  const [classifications, setClassifications] = useState([]);
  const [selections, setSelections] = useState([]);

  useEffect(() => {
    setClassifications(pc);
    setSelections(cs);
  }, [results]);

  const handleSelection = (code, event) => {
    let newSelections = selections.map(s => {
      if (s.code === code) {
        return {
          ...s,
          value: event.target.checked ? "1" : "0",
        }
      }
      return s;
    })
    setSelections(newSelections);
  };

  const handleSubmit = () => {
    let position = "";
    let codes = "";
    let values = "";
    let updatedDates = "";
    let updaterIds = "";

    selections.forEach(s => {
      if (s.date) {
        const separator = position === "" ? "" : ",";
        position = position.concat(separator, positionNumber);
        codes = codes.concat(separator, s.code);
        values = values.concat(separator, s.value);
        updatedDates = updatedDates.concat(separator, s.date);
        updaterIds = updaterIds.concat(separator, s.user_id);
      }
    })

    dispatch(positionClassificationsEdit({
      "id": position,
      "values": values,
      "codes": codes,
      "updater_ids": updaterIds,
      "updated_dates": updatedDates,
    }));
  }

  return (isLoading ?
    <Spinner type="position-classifications" size="small" /> :
    <div className="position-classifications">
      <div className="line-separated-fields">
        <div>
          <span>Position:</span>
          <span>{bureau} {positionNumber}</span>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {classifications?.map((o) => (
                <th key={o.code}>{o.short_description}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {classifications?.map((o) => (
                <td key={o.code}>
                  <input
                    type="checkbox"
                    name={`${o.code}`}
                    checked={selections.find(s => o.code === s.code && s.value === '1') ?? false}
                    onChange={(event) => handleSelection(o.code, event)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="position-classifications--actions">
        <button onClick={handleSubmit}>Save</button>
      </div>
    </div>
  );
};

PositionClassification.propTypes = {
  positionNumber: PropTypes.string.isRequired,
  bureau: PropTypes.string.isRequired,
};

PositionClassification.defaultProps = {
  positionNumber: undefined,
  bureau: undefined,
};

export default PositionClassification;
