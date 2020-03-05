import React from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import shortid from 'shortid';
import COMPARE_LIMIT from '../../Constants/Compare';
import { getPostName } from '../../utilities';
import {
  NO_GRADE,
  NO_POST,
} from '../../Constants/SystemMessages';
import CompareCheck from '../CompareCheck';
import ViewComparisonLink from '../ViewComparisonLink/ViewComparisonLink';
import ResetComparisons from '../ResetComparisons/ResetComparisons';
import { COMPARE_LIST } from '../../Constants/PropTypes';

const CompareDrawer = ({ comparisons, isHidden }) => {
  const limit = 5;
  const compareArray = (comparisons || []).slice(0, COMPARE_LIMIT);
  const emptyArray = Array(limit - compareArray.length).fill();
  return (
    <div className={`compare-drawer ${isHidden ? 'drawer-hidden' : ''}`}>
      <div className="compare-drawer-inner-container">
        {
          compareArray.map(c => (
            <div key={c.id} className="compare-item">
              <div className="check-container">
                <CompareCheck
                  refKey={c.id}
                  customElement={<FA name="close" />}
                  interactiveElementProps={{ title: 'Remove this comparison' }}
                />
              </div>
              <span className="data-point title">
                <strong>{c.position.title}</strong>
              </span>
              <span className="data-point">
                <strong>Grade:</strong> {c.position.grade || NO_GRADE}
              </span>
              <span className="data-point">
                <strong>Location:</strong> {getPostName(c.position.post, NO_POST)}
              </span>
            </div>
          ))
        }
        {
          emptyArray.map(() => (
            <div
              key={shortid.generate()}
              className="compare-item compare-item-empty"
            />
          ))
        }
        <div className="button-container">
          <ViewComparisonLink />
          <ResetComparisons
            className="reset-link"
          />
        </div>
      </div>
    </div>
  );
};

CompareDrawer.propTypes = {
  comparisons: COMPARE_LIST,
  isHidden: PropTypes.bool,
};

CompareDrawer.defaultProps = {
  comparisons: [],
  isHidden: false,
};

export default CompareDrawer;
