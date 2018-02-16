import React from 'react';
import PropTypes from 'prop-types';
import InteractiveElement from '../../InteractiveElement';

const LetterList = ({ letters, onClick }) => (
  <div className="letters-list">
    {
      letters.map(letter =>
        (
          <InteractiveElement
            type="span"
            key={letter}
            role="link"
            title={`View terms that begin with ${letter}`}
            className="letter-link"
            onClick={() => onClick(letter)}
          >
            {letter}
          </InteractiveElement>
        ),
      )
    }
    <InteractiveElement
      type="span"
      role="link"
      title="View all terms"
      className="letter-link letter-link--all"
      onClick={() => onClick(null)}
    >
      All
    </InteractiveElement>
  </div>
);

LetterList.propTypes = {
  letters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default LetterList;
