import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { POSITION_MANAGER_PAGE_SIZES, BUREAU_POSITION_SORT } from 'Constants/Sort';
import { usePrevious } from 'hooks';
import Picky from 'react-picky';
import ProfileSectionTitle from 'Components/ProfileSectionTitle';
import SearchBar from 'Components/SearchBar/SearchBar';
import BureauResultsCard from '../BureauResultsCard';
import ListItem from '../../BidderPortfolio/BidControls/BidCyclePicker/ListItem';
import { bureauPositionsFetchData } from '../../../actions/bureauPositions';
import ResultsControls from '../../ResultsControls/ResultsControls';


const PositionManager = props => {
  const [textValue, setTextValue] = useState('temp text');
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [sortType, setSortType] = useState();
  const limit = 15;

  const tempGrade = [
    { value: 'OM', text: 'Office Manager (OM)' },
    { value: '01', text: '01' },
    { value: '02', text: '02' },
    { value: '03', text: '03' },
    { value: '04', text: '04' },
    { value: '05', text: '05' },
    { value: '06', text: '06' },
    { value: '07', text: '07' },
    { value: '08', text: '08' },
    { value: '00', text: '00' },
    { value: 'MC', text: 'MC Minister-Counselor (FE-MC)' },
    { value: 'OC', text: 'OC Counselor (FE-OC)' },
  ];
  const tempSkill = [
    { value: 'Contruction Engineers', text: 'Contruction Engineers' },
    { value: 'Consular', text: 'Consular' },
    { value: 'DCM-PO', text: 'DCM-PO' },
    { value: 'Diplomatic Courier', text: 'Diplomatic Courier' },
    { value: 'Facilities Manager', text: 'Facilities Manager' },
    { value: 'Economic', text: 'Economic' },
    { value: 'Financial Management', text: 'Financial Management' },
    { value: 'General Services', text: 'General Services' },
    { value: 'Info Mgt Specialist', text: 'Info Mgt Specialist' },
    { value: 'Info Mgt Tech Spec', text: 'Info Mgt Tech Spec' },
    { value: 'Refugee Affairs', text: 'Refugee Affairs' },
    { value: 'Interfunctional', text: 'Interfunctional' },
  ];
  const tempPost = [{ value: 'Barronett, Kentucky', text: 'Barronett, Kentucky' },
    { value: 'Cecilia, Ohio', text: 'Cecilia, Ohio' },
    { value: 'Courtland, Maryland', text: 'Courtland, Maryland' },
    { value: 'Crown, Illinois', text: 'Crown, Illinois' },
    { value: 'Edgewater, Missouri', text: 'Edgewater, Missouri' },
    { value: 'Elrama, Alabama', text: 'Elrama, Alabama' },
    { value: 'Enetai, Guam', text: 'Enetai, Guam' },
    { value: 'Foxworth, Tennessee', text: 'Foxworth, Tennessee' },
    { value: 'Gorham, Marshall Islands', text: 'Gorham, Marshall Islands' },
    { value: 'Kenvil, Connecticut', text: 'Kenvil, Connecticut' },
    { value: 'Lowgap, District Of Columbia', text: 'District Of Columbia' },
    { value: 'Lynn, Massachusetts', text: 'Lynn, Massachusetts' },
    { value: 'Saranap, Maine', text: 'Saranap, Maine' },
    { value: 'Sehili, Idaho', text: 'Sehili, Idaho' },
    { value: 'Tyhee, Georgia', text: 'Tyhee, Georgia' },
    { value: 'Winesburg, Virginia', text: 'Winesburg, Virginia' },
  ];
  const tempTED = [{ value: '10 MOS', text: '10 MOS' },
    { value: '1 YEAR', text: '1 YEAR' },
    { value: '1 YR (1 R &amp; R)', text: '1 YR (1 R &amp; R)' },
    { value: '1 YR (2 R &amp; R)', text: '1 YR (2 R &amp; R)' },
    { value: '1 YR(3R&amp;R)/HL/1 YR(3R&', text: '1 YR(3R&amp;R)/HL/1 YR(3R&' },
    { value: '14MOS/HL/2 YEAR (R&amp;R)', text: '14MOS/HL/2 YEAR (R&amp;R)' },
    { value: '18 MOS', text: '18 MOS' },
    { value: '18 MOS/HL/18 MOS', text: '18 MOS/HL/18 MOS' },
    { value: '2 YRS/TRANSFER', text: '2 YRS/TRANSFER' },
    { value: '2 YRS/HLRT/2 YRS', text: '2 YRS/HLRT/2 YRS' },
    { value: '2 YRS (1 R &amp; R)', text: '2 YRS (1 R &amp; R)' },
    { value: '2 YRS (2 R &amp; R)', text: '2 YRS (2 R &amp; R)' },
    { value: '2 YRS (3 R &amp; R)', text: '2 YRS (3 R &amp; R)' },
    { value: '2 YRS (4 R &amp; R)', text: '2 YRS (4 R &amp; R)' },
    { value: '3 YRS/TRANSFER', text: '3 YRS/TRANSFER' },
    { value: '3 YRS (2 R &amp; R)', text: '3 YRS (2 R &amp; R)' },
    { value: '3 YRS (3 R &amp; R)', text: '3 YRS (3 R &amp; R)' },
    { value: '4 YRS/TRANSFER', text: '4 YRS/TRANSFER' },
    { value: 'INDEFINITE', text: 'INDEFINITE' },
    { value: 'NOT APPLICABLE', text: 'NOT APPLICABLE' },
    { value: 'OTHER', text: 'OTHER' }];

  const [selectedGrades, setSelectedGrades] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [selectedTEDs, setSelectedTEDs] = useState([]);

  const pageSizes = POSITION_MANAGER_PAGE_SIZES;
  const sortBy = BUREAU_POSITION_SORT;

  function submitSearch() {
  }

  function onChangeQueryText(newText) {
    setTextValue(newText);
  }

  const prevtextValue = usePrevious(textValue);

  useEffect(() => {
    const shouldUpdate = (textValue || prevtextValue) && textValue !== prevtextValue;
    if (shouldUpdate) {
      // props.changeText(textValue);
    }
  }, [textValue]);

  useEffect(() => {
    props.fetchBureauPositions(sortType, limit, page);
    // if we want to do anything with our selected values once they update
  }, [selectedGrades]);

  function onClear() {
  }

  function renderList({ items, selected, ...rest }) {
    const getIsSelected = item => !!selected.find(f => f.value === item.value);
    return items.map(item => <ListItem key={item.value} item={item} {...rest} queryProp="text" getIsSelected={getIsSelected} />);
  }

  return (
    <div className="bureau-page">
      <div className="usa-grid-full position-manager-upper-section">
        <div className="results-search-bar padded-main-content results-single-search homepage-offset">
          <div className="usa-grid-full results-search-bar-container">
            <ProfileSectionTitle title="Position Manager" icon="map" />
            <form className="usa-grid-full" onSubmit={submitSearch} >
              <fieldset className="usa-width-five-sixths">
                <div className="usa-width-one-whole search-results-inputs search-keyword">
                  <legend className="usa-grid-full homepage-search-legend">Search for a position</legend>
                  <SearchBar
                    id="search-keyword-field"
                    label="Keywords"
                    type="medium"
                    submitText="Search"
                    labelSrOnly
                    noForm
                    noButton
                    placeholder="Type keywords here"
                    onChangeText={onChangeQueryText}
                    showClear
                    onClear={onClear}
                  />
                </div>
              </fieldset>
              <div className="usa-width-one-sixth search-submit-button">
                <button className="usa-button" type="submit" disabled>
                  <FontAwesome name="search" className="label-icon" />
                Search
                </button>
              </div>
            </form>
            <div className="filterby-label">Filter by:</div>
            <div className="usa-width-one-whole position-manager-filters results-dropdown">
              <div className="small-screen-stack position-manager-filters-inner">
                <div className="filter-div">
                  <div className="label">TED:</div>
                  <Picky
                    placeholder="Select TED(s)"
                    value={selectedTEDs}
                    options={tempTED}
                    onChange={values => setSelectedTEDs(values)}
                    numberDisplayed={2}
                    multiple
                    includeFilter
                    dropdownHeight={255}
                    renderList={renderList}
                    valueKey="value"
                    labelKey="text"
                    includeSelectAll
                  />
                </div>
                <div className="filter-div">
                  <div className="label">Post:</div>
                  <Picky
                    placeholder="Select Post(s)"
                    value={selectedPosts}
                    options={tempPost}
                    onChange={values => setSelectedPosts(values)}
                    numberDisplayed={2}
                    multiple
                    includeFilter
                    dropdownHeight={255}
                    renderList={renderList}
                    valueKey="value"
                    labelKey="text"
                    includeSelectAll
                  />
                </div>
                <div className="filter-div">
                  <div className="label">Skill:</div>
                  <Picky
                    placeholder="Select Skill(s)"
                    value={selectedSkills}
                    options={tempSkill}
                    onChange={values => setSelectedSkills(values)}
                    numberDisplayed={2}
                    multiple
                    includeFilter
                    dropdownHeight={255}
                    renderList={renderList}
                    valueKey="value"
                    labelKey="text"
                    includeSelectAll
                  />
                </div>
                <div className="filter-div">
                  <div className="label">Grade:</div>
                  <Picky
                    placeholder="Select Grade(s)"
                    value={selectedGrades}
                    options={tempGrade}
                    onChange={values => setSelectedGrades(values)}
                    numberDisplayed={2}
                    multiple
                    includeFilter
                    dropdownHeight={255}
                    renderList={renderList}
                    valueKey="value"
                    labelKey="text"
                    includeSelectAll
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ResultsControls
        results={{}}
        hasLoaded
        defaultSort={''}
        pageSizes={pageSizes}
        defaultPageSize={10}
        sortBy={sortBy}
        defaultPageNumber={1}
        queryParamUpdate={() => {}}
        containerClass="bureau-results-controls"
        pageSizeClass="bureau-page-size"
        hideSaveSearch
      />
      <div className="usa-width-one-whole position-manager-lower-section results-dropdown">
        <div className="usa-grid-full position-list">
          {[...Array(10).keys()].map((m) => (
            <BureauResultsCard key={m} />
          ))}
        </div>
      </div>
    </div>
  );
};

PositionManager.propTypes = {
  fetchBureauPositions: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  bureauPositions: state.bureauPositions,
  bureauPositionsIsLoading: state.bureauPositionsIsLoading,
  bureauPositionsHasErrored: state.bureauPositionsHasErrored,
});

export const mapDispatchToProps = dispatch => ({
  fetchBureauPositions: (sortType, limit, page) =>
    dispatch(bureauPositionsFetchData(sortType, limit, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PositionManager);
