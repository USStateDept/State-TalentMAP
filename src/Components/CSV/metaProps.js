/* eslint-disable */
import { string, array, oneOfType, bool, func } from 'prop-types';


export const propTypes = {
  data: oneOfType([string, array]).isRequired,
  headers: array,
  target: string,
  separator: string,
  filename: string,
  uFEFF: bool,
  onClick: func,
  asyncOnClick: bool,
  transform: func
};

export const defaultProps = {
  separator: ',',
  filename: 'generatedBy_react-csv.csv',
  uFEFF: true,
  asyncOnClick: false,
  transform: v => v,
};

export const PropsNotForwarded = [
  `data`,
  `headers`
];

// export const DownloadPropTypes = Object.assign(
//   {},
//   PropTypes,
//   {
//     : ,
//   }
// );

/* eslint-enable */
