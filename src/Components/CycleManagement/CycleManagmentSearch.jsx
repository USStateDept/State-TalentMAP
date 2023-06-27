import SearchBar from 'Components/SearchBar/SearchBar';

const CycleManagementSearch = () =>
  (
    <SearchBar
      id="cycle-management-search"
      placeholder={'Search using Position Number or Position Title'}
      submitText="Search"
      noButton
    />
  )
;

export default CycleManagementSearch;
