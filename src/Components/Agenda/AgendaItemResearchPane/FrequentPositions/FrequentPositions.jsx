import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';

const FrequentPositions = (props) => {
  const headers = ['', 'Organization', 'Position Number', 'Position Title'];

  const { positions, onClick } = props;

  const onClick$ = pos => {
    onClick(pos);
  };

  return (
    <div className="frequent-positions-table">
      <table>
        <thead>
          <tr>
            {headers.map(h => <th key={h}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {
            positions.map(m => (
              <tr>
                <td>
                  <InteractiveElement title="Add to Agenda Item" onClick={() => onClick$(m)}>
                    <FA name="plus-circle" />
                  </InteractiveElement>
                </td>
                <td>{m.org}</td>
                <td>{m.position_number}</td>
                <td>{m.position_title}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

FrequentPositions.propTypes = {
  positions: PropTypes.arrayOf(PropTypes.shape({
    org: PropTypes.string,
    position_number: PropTypes.string,
    position_title: PropTypes.string,
  })),
  onClick: PropTypes.func,
};

FrequentPositions.defaultProps = {
  positions: [],
  onClick: EMPTY_FUNCTION,
};

export default FrequentPositions;
