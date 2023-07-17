import PropTypes from 'prop-types';
import numeral from 'numeral';

const format = n => numeral(n).format('0,0');

const TotalResults = ({ total, pageNumber, pageSize, suffix, isHidden }) => {
  let showTotal;
  let beginning;
  let through;
  let isAllResults = false;
  if (pageSize !== 'all') {
    beginning = ((pageNumber - 1) * pageSize) + 1;
    through = Math.min((pageSize * pageNumber), total);
    showTotal = (beginning <= through) && (total > 0);
    beginning = format(beginning);
    through = format(through);
  } else isAllResults = true;

  const total$ = format(total);

  return (
    <span id="total-results" className={isHidden ? 'hide' : ''}>
      {
        isAllResults &&
          <div>
            Viewing <strong>{total$}</strong> {suffix}
          </div>
      }
      {
        !isAllResults && showTotal &&
          <div>
            Viewing <strong>{beginning}-{through}</strong> of <strong>{total$}</strong> {suffix}
          </div>
      }
    </span>
  );
};

TotalResults.propTypes = {
  total: PropTypes.number.isRequired, // total number of results
  pageNumber: PropTypes.number.isRequired, // current page number
  pageSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  suffix: PropTypes.string,
  isHidden: PropTypes.bool,
};

TotalResults.defaultProps = {
  suffix: 'Results',
  isHidden: false,
};

export default TotalResults;

