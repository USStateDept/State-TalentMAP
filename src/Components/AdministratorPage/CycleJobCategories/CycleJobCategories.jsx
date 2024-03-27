import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import FA from 'react-fontawesome';
import swal from '@sweetalert/with-react';
import Spinner from 'Components/Spinner';
import TabbedCard from 'Components/TabbedCard/TabbedCard';
import CheckBox from 'Components/CheckBox/CheckBox';
import {
  cycleCategories as cycleCategoriesList, cycleJobCategories,
  cycleJobCategoriesEdit, cycleJobCategoriesStatuses,
} from 'actions/cycleJobCategories';
import { checkFlag } from 'flags';

const useJobCategories = () => checkFlag('flags.job_categories');

const CycleJobCategories = () => {
  const dispatch = useDispatch();

  const [selectedCycle, setSelectedCycle] = useState('');
  const cycleCategories = useSelector(state => state.cycleCategories) || [];
  const cycleCategoriesIsLoading = useSelector(state => state.cycleCategoriesLoading);
  const jobCategories = useSelector(state => state.cycleJobCategories) || [];
  const jobCategoriesIsLoading = useSelector(state => state.cycleJobCategoriesLoading);
  const jobCategoriesStatuses = useSelector(state => state.cycleJobCategoriesStatuses) || [];
  const jobCategoriesStatusesIsLoading =
    useSelector(state => state.cycleJobCategoriesStatusesLoading);

  const [selectedJobCategories, setSelectedJobCategories] = useState([]);
  const [jobCategorySearch, setJobCategorySearch] = useState('');

  useEffect(() => {
    dispatch(cycleCategoriesList());
    dispatch(cycleJobCategoriesStatuses());
  }, []);

  useEffect(() => {
    if (selectedCycle && selectedCycle !== '') {
      dispatch(cycleJobCategories({ cycle_category_code: selectedCycle?.code }));
    }
  }, [selectedCycle]);

  useEffect(() => {
    if (jobCategories?.length) {
      setSelectedJobCategories(jobCategories?.filter(j => j.included === '1').map(j => j.code));
    }
  }, [jobCategories]);

  const getDisplayedJobCategories = () => {
    if (jobCategories?.length > 0) {
      if (jobCategorySearch === '') {
        return jobCategories;
      }
      return jobCategories?.filter(j =>
        j.description.toLowerCase().includes(jobCategorySearch.toLowerCase()));
    }
    return [];
  };

  const handleSelectJob = (job) => {
    if (selectedJobCategories?.find(o => o === job.code)) {
      const newSelection = selectedJobCategories?.filter(o => o !== job.code);
      setSelectedJobCategories(newSelection);
    } else {
      setSelectedJobCategories([
        ...selectedJobCategories,
        job.code,
      ]);
    }
  };
  const handleSelectAllJobs = () => {
    // Only handle the job categories displayed in the search result
    const resultCategories = getDisplayedJobCategories().map(j => j.code);
    const allSelected = selectedJobCategories.every(j => resultCategories.includes(j));
    if (allSelected) {
      const newSelected = selectedJobCategories.filter(j => !resultCategories.includes(j));
      setSelectedJobCategories(newSelected);
    } else {
      const newSelected = selectedJobCategories?.concat(resultCategories);
      setSelectedJobCategories([...new Set(newSelected)]);
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
                  jobCategories?.filter(j => j.included === '1').map(j => j.code),
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

  return ((cycleCategoriesIsLoading || jobCategoriesIsLoading || jobCategoriesStatusesIsLoading) ?
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
          <select
            id="cycle-category"
            value={selectedCycle?.code || ''}
            onChange={(e) =>
              setSelectedCycle(cycleCategories?.find(c => c.code === e.target.value))
            }
          >
            <option value="" disabled>Select a Cycle Category</option>
            {cycleCategories?.length && cycleCategories?.map(b => (
              <option key={b.code} value={b.code}>{b.description}</option>
            ))}
          </select>
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
                <span>{selectedCycle?.description ?? 'No Cycle Category Selected'}</span>
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
                          {useJobCategories() &&
                            <Link to="/profile/administrator/jobcategories" className="new-category-button">
                              <FA className="fa-solid fa-plus" name="new-job-category" />
                              <p>New Job Category</p>
                            </Link>
                          }
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getDisplayedJobCategories().map(job => (
                      <tr key={job.code}>
                        <td>
                          <CheckBox
                            id={`selected-${job.code}`}
                            value={selectedJobCategories?.find(o => o === job.code) !== undefined}
                            onCheckBoxClick={() => handleSelectJob(job)}
                          />
                        </td>
                        <td>{job.description}</td>
                        <td>
                          {(jobCategoriesStatuses?.length &&
                            jobCategoriesStatuses?.find(s => s.code === job.code)?.status) || 'Inactive'
                          }
                        </td>
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

CycleJobCategories.propTypes = {
};

CycleJobCategories.defaultProps = {
};

export default withRouter(CycleJobCategories);
