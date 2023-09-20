import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Picky from 'react-picky';
import FA from 'react-fontawesome';
import swal from '@sweetalert/with-react';
import Spinner from 'Components/Spinner';
import TabbedCard from '../../TabbedCard/TabbedCard';
import CheckBox from '../../CheckBox/CheckBox';
import { cycleJobCategoriesData, cycleJobCategoriesEdit, cycleJobCategoriesFilters } from '../../../actions/cycleJobCategories';
import ListItem from '../../BidderPortfolio/BidControls/BidCyclePicker/ListItem/ListItem';

const CycleJobCategory = () => {
  const dispatch = useDispatch();

  const cycleCategories = useSelector(state => state.cycleJobCategoriesFilters) || [];
  const cycleCategoriesIsLoading = useSelector(state => state.cycleJobCategoriesFiltersLoading);
  const jobCategories = useSelector(state => state.cycleJobCategoriesData) || [];
  const jobCategoriesIsLoading = useSelector(state => state.cycleJobCategoriesDataLoading);

  const [selectedCycle, setSelectedCycle] = useState([]);
  const [selectedJobCategories, setSelectedJobCategories] = useState([]);
  const [jobCategorySearch, setJobCategorySearch] = useState('');

  useEffect(() => {
    dispatch(cycleJobCategoriesFilters());
  }, []);

  useEffect(() => {
    dispatch(cycleJobCategoriesData(selectedCycle.id));
  }, [selectedCycle]);

  useEffect(() => {
    if (cycleCategories && cycleCategories.length) {
      setSelectedCycle(cycleCategories[0]);
    }
  }, [cycleCategories]);

  useEffect(() => {
    if (jobCategories && jobCategories.length) {
      setSelectedJobCategories(jobCategories.filter(j => j.selected).map(j => j.id));
    }
  }, [jobCategories]);

  const getDisplayedJobCategories = () => {
    if (jobCategories.length > 0) {
      if (jobCategorySearch === '') {
        return jobCategories;
      }
      return jobCategories.filter(j =>
        j.description.toLowerCase().includes(jobCategorySearch.toLowerCase()));
    }
    return [];
  };

  const handleSelectJob = (job) => {
    if (selectedJobCategories.find(o => o === job.id)) {
      const newSelection = selectedJobCategories.filter(o => o !== job.id);
      setSelectedJobCategories(newSelection);
    } else {
      setSelectedJobCategories([
        ...selectedJobCategories,
        job.id,
      ]);
    }
  };
  const handleSelectAllJobs = () => {
    const allSelected = jobCategories?.length === selectedJobCategories?.length;
    if (allSelected) {
      setSelectedJobCategories([]);
    } else {
      setSelectedJobCategories(jobCategories?.map(j => j.id));
    }
  };

  const showCancelModal = () => {
    swal({
      title: 'Confirm Discard Changes',
      button: false,
      closeOnEsc: true,
      content: (
        <div className="simple-action-modal">
          <div className="help-text">
            <span>Are you sure you want to discard all changes made?</span>
          </div>
          <div className="modal-controls">
            <button
              onClick={() => {
                setSelectedJobCategories(
                  jobCategories?.filter(j => j.selected).map(j => j.id),
                );
                swal.close();
              }}
            >
              Submit
            </button>
            <button className="usa-button-secondary" onClick={() => swal.close()}>Cancel</button>
          </div>
        </div >
      ),
    });
  };

  const handleSubmit = () => {
    dispatch(cycleJobCategoriesEdit(selectedJobCategories));
  };

  const renderSelectionList = ({ items, selected, ...rest }) => {
    const queryProp = 'description';
    return items.map((item, index) => {
      const keyId = `${index}-${item}`;
      return (<ListItem
        item={item}
        {...rest}
        key={keyId}
        queryProp={queryProp}
      />);
    });
  };


  return ((cycleCategoriesIsLoading || jobCategoriesIsLoading) ?
    <Spinner type="homepage-position-results" class="homepage-position-results" size="big" /> :
    <div className="cycle-job-category">
      <div className="cycle-job-category__header position-search--filters--cjc">
        <span className="header-title">
          Update Cycle Categories
        </span>
        <span className="header-subtitle">
          This is an area where you can edit the Job Category Descriptions
          tied to the Cycle Category.
        </span>
        <div className="filter-div">
          <div className="label">Cycle Category</div>
          <Picky
            placeholder="Select a Cycle Category"
            value={selectedCycle}
            options={cycleCategories.length ? cycleCategories : []}
            onChange={setSelectedCycle}
            includeFilter
            dropdownHeight={255}
            renderList={renderSelectionList}
            valueKey="id"
            labelKey="description"
          />
        </div>
      </div>
      <TabbedCard
        tabs={[{
          text: 'Job Category Descriptions',
          value: 'descriptions',
          content: (
            <div className="job-category-table">
              <div className="category-type">
                <span>Category Type:</span>
                <span>{selectedCycle.description ?? 'No Cycle Category Selected'}</span>
              </div>
              {selectedCycle && <>
                <input
                  id="job-category-search"
                  value={jobCategorySearch}
                  onChange={(event) => setJobCategorySearch(event.target.value)}
                  type="search"
                  name="search"
                  placeholder="Filter by Job Category Description"
                  className="job-category-search"
                />
                <table>
                  <thead>
                    <tr>
                      <th>
                        <CheckBox
                          id="select-all"
                          value={jobCategories?.length === selectedJobCategories?.length}
                          onCheckBoxClick={() => handleSelectAllJobs()}
                        />
                      </th>
                      <th>Job Category Descriptions</th>
                      <th>
                        <div>
                          <div>
                            Status
                          </div>
                          <div className="new-category-button">
                            <FA className="fa-solid fa-plus" name="new-job-category" />
                            <p>New Job Category</p>
                          </div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getDisplayedJobCategories().map(job => (
                      <tr key={job.id}>
                        <td>
                          <CheckBox
                            id={`selected-${job.id}`}
                            value={selectedJobCategories.find(o => o === job.id) !== undefined}
                            onCheckBoxClick={() => handleSelectJob(job)}
                          />
                        </td>
                        <td>{job.description}</td>
                        <td>{job.active ? 'Active' : 'Inactive'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>}
              <div className="position-form--actions">
                <button onClick={showCancelModal}>Cancel</button>
                <button onClick={handleSubmit}>Save</button>
              </div>
            </div>
          ),
        }]}
      />
    </div>
  );
};

CycleJobCategory.propTypes = {
};

CycleJobCategory.defaultProps = {
};

export default withRouter(CycleJobCategory);
