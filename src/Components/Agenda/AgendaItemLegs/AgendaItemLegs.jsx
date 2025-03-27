import PropTypes from 'prop-types';
import { formatDate, formatLang, formatMonthYearDate, shortenString } from 'utilities';
import { filter, take, takeRight } from 'lodash';
import FA from 'react-fontawesome';
import { formatVice } from '../Constants';

const AgendaItemLegs = props => {
  const {
    legs,
    isCard,
    isPanelMeetingView,
  } = props;

  // Limit the number of legs to 2 for card view
  let legs$ = legs;
  if (isCard && legs.length > 2) {
    legs$ = [take(legs)[0], takeRight(legs)[0]];
  }
  const strLimit = isCard ? 15 : 50;
  const formatStr = (d) => shortenString(d, strLimit);

  /**
   * Retrieves the data for a specific key from a leg object and applies an optional helper function.
   * @param {Object} leg - The leg object.
   * @param {string} key - The key to retrieve the data from.
   * @param {Function} [helperFunc=(value) => value] - An optional helper function to format the data.
   * @returns {string} - The formatted data or a default value if the data is not available.
   */
  const getData = (leg, key, helperFunc = (value) => value) => {
    let value = leg[key];

    // Add the adjust month to certain actions
    if (key === 'action' && ['Extend', 'Curtail', 'Adjust'].includes(leg[key])) {
      if (leg.adjust_month !== null && leg.adjust_month !== 0) {
        value = `${leg[key]} (by ${leg.adjust_month})`;
      }
    }

    return helperFunc(value, leg) ?? value ?? 'None listed';
  };

  /**
   * Generates the arrow icon for a leg.
   * @param {Object} leg - The leg object.
   * @returns {JSX.Element} - The arrow icon element.
   */
  const getArrows = (leg) => (
    <FA name="arrow-right" className={`${leg?.is_separation ? 'hide' : ''} ai-legs-arrow`} />
  );

  /**
   * Retrieves the TED (Tour End Date) for a leg and formats it.
   * @param {Object} leg - The leg object.
   * @returns {string} - The formatted TED or a default value if not available.
   */
  const getTeds = (value, leg) => {
    let ted = 'None listed';
    if (value) {
      if (leg?.is_separation) {
        ted = formatDate(value);
      } else {
        ted = formatMonthYearDate(value);
      }
    }
    return ted;
  };

  // Define the table data structure
  const tableData = [
    { title: 'Action', key: 'action', helperFunc: null, cardView: false },
    { title: 'Position Title', key: 'pos_title', helperFunc: formatStr, cardView: false },
    { title: 'Position Number', key: 'pos_num', helperFunc: null, cardView: false },
    { title: 'Location/Org', key: 'org', helperFunc: formatStr, cardView: true },
    { title: 'Lang', key: 'languages', helperFunc: formatLang, cardView: false },
    { title: 'Skills', key: 'custom_skills_description', helperFunc: null, cardView: false },
    { title: 'ETA', key: 'eta', helperFunc: formatMonthYearDate, cardView: true },
    { title: '', key: 'arrows', helperFunc: getArrows, cardView: true },
    { title: 'TED', key: 'ted', helperFunc: getTeds, cardView: true },
    { title: 'TOD', key: 'tod_short_desc', helperFunc: null, cardView: false },
    { title: 'Travel', key: 'travel_desc', helperFunc: null, cardView: false },
    { title: 'PP/Grade', key: 'combined_pp_grade', helperFunc: null, cardView: false },
  ];

  // Add Vice column if in panel meeting view
  if (isPanelMeetingView) {
    tableData.push({ title: 'Vice', key: 'vice', helperFunc: formatVice, cardView: false });
  }

  // Filter table data for card view if necessary
  const tableData$ = isCard ? filter(tableData, 'cardView') : tableData;

  return (
    <div className="ai-legs">
      <table>
        <thead>
          <tr>
            {tableData$.map(tr => (
              <th key={tr.title}>
                <dt>{tr.title}</dt>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {legs$.map((leg, index) => (
            <tr key={`${leg.ail_seq_num} - ${index}`}>
              {tableData$.map(tr => (
                <td key={`${tr.title} - ${leg.ail_seq_num}`}>
                  {tr.key === 'arrows' ? getArrows(leg) : getData(leg, tr.key, tr.helperFunc || ((value) => value))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

AgendaItemLegs.propTypes = {
  legs: PropTypes.arrayOf(PropTypes.shape({})),
  isCard: PropTypes.bool,
  isPanelMeetingView: PropTypes.bool,
};

AgendaItemLegs.defaultProps = {
  legs: [],
  isCard: false,
  isPanelMeetingView: false,
};

export default AgendaItemLegs;
