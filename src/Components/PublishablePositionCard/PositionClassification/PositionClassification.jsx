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
    let editPosition = "";
    let editCodes = "";
    let editValues = "";
    let editUpdatedDates = "";
    let editUpdaterIds = "";

    let newPosition = "";
    let newCodes = "";
    let newValues = "";
    let newUpdated = "";

    selections.forEach(s => {
      if (s.date) {
        const separator = editPosition === "" ? "" : ",";
        editPosition = editPosition.concat(separator, positionNumber);
        editCodes = editCodes.concat(separator, s.code);
        editValues = editValues.concat(separator, s.value);
        editUpdatedDates = editUpdatedDates.concat(separator, s.date);
        editUpdaterIds = editUpdaterIds.concat(separator, s.user_id);
      } else if (s.value) {
        const separator = newPosition === "" ? "" : ",";
        newPosition = newPosition.concat(separator, positionNumber);
        newCodes = newCodes.concat(separator, s.code);
        newValues = newValues.concat(separator, s.value);
        newUpdated = newUpdated.concat(separator);
      }
    })

    if (editPosition !== "") {
      dispatch(positionClassificationsEdit({
        "id": editPosition,
        "values": editValues,
        "codes": editCodes,
        "updater_ids": editUpdaterIds,
        "updated_dates": editUpdatedDates,
      }));
    }
    if (newPosition !== "") {
      dispatch(positionClassificationsEdit({
        "id": newPosition,
        "values": newValues,
        "codes": newCodes,
        "updater_ids": newUpdated,
        "updated_dates": newUpdated,
      }));
    }
  }

  return (isLoading ?
    <div className="loading-animation--5">
      <div className="loading-message pbl-20">
        Loading additional data
      </div>
    </div> :
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
