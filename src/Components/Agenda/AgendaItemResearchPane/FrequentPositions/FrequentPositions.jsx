import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import Fuse from 'fuse.js';
import InteractiveElement from 'Components/InteractiveElement';
import FieldSet from 'Components/FieldSet/FieldSet';
import TextInput from 'Components/TextInput';
import { EMPTY_FUNCTION } from 'Constants/PropTypes';

const fuseOptions = {
  shouldSort: false,
  findAllMatches: true,
  tokenize: true,
  includeScore: false,
  threshold: 0.25,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'org', 'position_number', 'position_title',
  ],
};

const FrequentPositions = (props) => {
  const headers = ['', 'Organization', 'Position Number', 'Position Title'];

  const { positions, onClick } = props;

  const [positions$, setPositions$] = useState(positions);
  const [term, setTerm] = useState('');

  const onClick$ = pos => {
    onClick(pos);
  };

  const fuse$ = new Fuse(positions, fuseOptions);
  const search = a => setPositions$(fuse$.search(a));

  useEffect(() => {
    setPositions$(positions);
  }, [positions]);

  const positions$$ = term ? positions$ : positions;

  return (
    <div className="frequent-positions-table">
      <FieldSet
        className="glossary-fieldset"
        legend="Enter a keyword to search"
        legendSrOnly
      >
        <TextInput
          changeText={e => { search(e); setTerm(e); }}
          value={term}
          labelSrOnly
          placeholder="Search for Frequent Positions"
          inputProps={{
            autoComplete: 'off',
          }}
        />
      </FieldSet>
      <table>
        <thead>
          <tr>
            {headers.map(h => <th key={h}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {
            positions$$.map(m => (
              <tr>
                <td>
                  <InteractiveElement title="Add to Agenda Item" onClick={() => onClick$(m)}>
                    <FA name="plus-circle" />
                  </InteractiveElement>
                </td>
                <td>{m.pos_org_short_desc}</td>
                <td>{m.pos_num_text}</td>
                <td>{m.pos_title_desc}</td>
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
    pos_org_short_desc: PropTypes.string,
    pos_num_text: PropTypes.string,
    pos_title_desc: PropTypes.string,
  })),
  onClick: PropTypes.func,
};

FrequentPositions.defaultProps = {
  positions: [],
  onClick: EMPTY_FUNCTION,
};

export default FrequentPositions;
