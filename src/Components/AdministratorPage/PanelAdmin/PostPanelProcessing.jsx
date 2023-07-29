import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from 'Components/Spinner';
import { postPanelProcessingFetchData } from 'actions/postPanelProcessing';
import FontAwesome from 'react-fontawesome';

const PostPanelProcessing = () => {
  const dispatch = useDispatch();

  // ============= Table Context =============

  // Replace with return value from API data retrieval
  const data = [{
    value: true,
    item: '0',
    label: 'EUR',
    name: 'Favro, Michelle',
    status: 'APR',
  }, {
    value: true,
    item: '1',
    label: 'KYIV',
    name: 'Favro, Michelle',
    status: 'APR',
  }, {
    value: false,
    item: '2',
    label: 'Paris',
    name: 'Favro, Michelle',
    status: 'APR',
  }, {
    value: false,
    item: '3',
    label: 'GTM/CDA/EL',
    name: 'Favro, Michelle',
    status: 'APR',
  }];

  const results = useSelector(state => state.postPanelProcessing);
  const isLoading = useSelector(state => state.postPanelProcessingLoading);

  useEffect(() => {
    dispatch(postPanelProcessingFetchData());
  }, []);

  const statusOptions = [{
    value: 'APR',
    label: 'APR',
  }, {
    value: 'DEF',
    label: 'DEF',
  }, {
    value: 'XXX',
    label: 'XXX',
  }, {
    value: 'DIS',
    label: 'DIS',
  }, {
    value: 'HLD',
    label: 'HLD',
  }, {
    value: 'MOV',
    label: 'MOV',
  }, {
    value: 'OOO',
    label: 'OOO',
  }, {
    value: 'PIP',
    label: 'PIP',
  }, {
    value: 'RDY',
    label: 'RDY',
  }, {
    value: 'WDR',
    label: 'WDR',
  }];

  const loadingSpinner = (<Spinner type="panel-admin-remarks" size="small" />);

  // ============= Form Management =============

  const [formData, setFormData] = useState(data);

  const handleStatusSelection = (objLabel, newStatus) => {
    const newFormData = formData.map(o => {
      if (o.label === objLabel) {
        return {
          ...o,
          status: newStatus,
        };
      }
      return o;
    });
    setFormData(newFormData);
  };

  const [canEditFields, setCanEditFields] = useState(true);

  useEffect(() => {
    setCanEditFields(true);
  }, [results]);

  const submit = () => {
    dispatch();
  };

  const clear = () => {
    const clearedFormData = formData.map(o => ({
      ...o,
      status: undefined,
    }));
    setFormData(clearedFormData);
  };

  return (
    !isLoading ?
      <div className="post-panel-processing">
        <div className="post-panel-processing--table">
          <table>
            <thead>
              <tr>
                <th>Val</th>
                <th>Item</th>
                <th>Label</th>
                <th>Name</th>
                {statusOptions.map((o) => (
                  <th key={o.label}>{o.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {formData.map(d => (
                <tr>
                  <td>
                    {d.value ?
                      <FontAwesome name="check" /> :
                      '---'
                    }
                  </td>
                  <td>
                    <span className="item-link">
                      {d.item}
                    </span>
                  </td>
                  <td>{d.label}</td>
                  <td>{d.name}</td>
                  {statusOptions.map((o) => (
                    <td key={o.label}>
                      <input
                        type="radio"
                        name={`${o.label} ${d.label}`}
                        checked={d.status === o.value}
                        onChange={() => handleStatusSelection(d.label, o.value)}
                        disabled={!canEditFields}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-button">
          Run Post Panel Processing
        </div>
        <div className="position-form--actions">
          <button onClick={clear} disabled={!canEditFields}>Clear</button>
          <button onClick={submit} disabled={!canEditFields}>Save</button>
        </div>
      </div>
      :
      <div>
        {loadingSpinner}
      </div>
  );
};

PostPanelProcessing.propTypes = {
};

PostPanelProcessing.defaultProps = {
};

export default withRouter(PostPanelProcessing);
