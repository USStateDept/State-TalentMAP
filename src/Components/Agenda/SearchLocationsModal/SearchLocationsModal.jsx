import { useEffect } from 'react';
import FA from 'react-fontawesome';
import PaginationWrapper from 'Components/PaginationWrapper/PaginationWrapper';
// import PropTypes from 'prop-types';
// import FA from 'react-fontawesome';
// import { find } from 'lodash';
// import { EMPTY_FUNCTION } from 'Constants/PropTypes';

const SearchLocationsModal = (props) => {
  // const cityRef = useRef();
  // const stateRef = useRef();
  // const countryRef = useRef();
  const {
    setCity,
    setState$,
    setCountry,
    setPage,
    locations,
  } = props;

  useEffect(() => {
    console.log('changing locs');
  }, [locations]);

  const locationResults = locations?.results || [];
  const headers = ['Code', 'City', 'State', 'Country', 'State'];

  return (
    <div className="search-locations-modal-container">
      <div className="search-locations-filters">
        <form>
          <div className="filter">
            <label htmlFor="citySearch">City:</label>
            <input
              type="search"
              id="citySearch"
              name="city"
              placeholder="Search city"
              onChange={setCity}
            />
            <FA name="search" />
          </div>
          <div className="filter">
            <label htmlFor="stateSearch">State:</label>
            <input
              type="search"
              id="stateSearch"
              name="state"
              placeholder="Search state"
              onChange={setState$}
            />
            <FA name="search" />
          </div>
          <div className="filter">
            <label htmlFor="countrySearch">Country:</label>
            <input
              type="search"
              id="countrySearch"
              name="country"
              placeholder="Search country"
              onChange={setCountry}
            />
            <FA name="search" />
          </div>
        </form>
      </div>
      <div className="results-container">
        <table>
          <thead>
            <tr>
              {headers.map(h => <th key={h}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {
              locationResults?.map(l => (
                <tr key={l.code}>
                  <td>{l.code}</td>
                  <td>{l.city}</td>
                  <td>{l.state}</td>
                  <td>{l.country}</td>
                  <td>{l.status}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <div className="usa-grid-full react-paginate">
          <PaginationWrapper
            pageSize={10}
            onPageChange={setPage}
            forcePage={1}
            totalResults={128}
          />
        </div>
      </div>
    </div>
  );
};

SearchLocationsModal.propTypes = {
};

SearchLocationsModal.defaultProps = {
};

export default SearchLocationsModal;
