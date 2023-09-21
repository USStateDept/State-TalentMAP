import { withRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import swal from '@sweetalert/with-react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns-v2';
import { jobCategoriesAdminFetchData, jobCategoriesFetchSkills } from 'actions/jobCategories';
import ToggleButton from 'Components/ToggleButton';
import CheckBox from 'Components/CheckBox';
import CreateJobCategoryModal from './CreateJobCategoryModal';
import ProfileSectionTitle from '../../ProfileSectionTitle';

const DATE_FORMAT = 'yyyyMMddkkmmss';

const JobCategories = () => {
  const dispatch = useDispatch();

  const jobCategories = useSelector(state => state.jobCategoriesAdminFetchData);
  const jobCategorySkills = useSelector(state => state.jobCategoriesFetchSkills);

  const jobCategoriesResults = jobCategories?.data;
  const jobCategorySkillsResults = jobCategorySkills?.data;

  const [selectedJobCategory, setSelectedJobCategory] = useState('');
  const [loadedSkillIds, setLoadedSkillIds] = useState([]);
  const [selectedSkillIds, setSelectedSkillIds] = useState([]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const getQuery = () => ({
    category_id: selectedJobCategory,
  });

  useEffect(() => {
    dispatch(jobCategoriesAdminFetchData());
    // The EP is not able to return a list of all skills; they can only be loaded
    // when supplied with a job category ID. Call below is a hack to just load in
    // all skills
    dispatch(jobCategoriesFetchSkills({ category_id: '1' }));
  }, []);

  useEffect(() => {
    if (selectedJobCategory !== '') {
      dispatch(jobCategoriesFetchSkills(getQuery()));
    }
    if (jobCategorySkillsResults) {
      jobCategorySkillsResults.forEach(skill => {
        if (skill.display_skill === '1') {
          setLoadedSkillIds([...loadedSkillIds, skill.id]);
        }
      });
    }
    setSelectedSkillIds([]);
  }, [selectedJobCategory]);

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectAll(true);
      setSelectedSkillIds(
        jobCategorySkillsResults?.map(skill => skill.code),
      );
    } else {
      setSelectAll(false);
      setSelectedSkillIds([]);
    }
  };

  const handleSelectSkill = (skill => {
    if (selectedSkillIds.includes(skill.code)) {
      const filteredSkills = selectedSkillIds.filter(x => x !== skill.code);
      setSelectedSkillIds(filteredSkills);
    } else {
      setSelectedSkillIds([...selectedSkillIds, skill.code]);
    }
  });

  const clearInputs = (() => {
    setSelectedSkillIds([]);
    setSelectAll(false);
    setIsEditMode(false);
  });

  const newJobCategoryModal = () => {
    setIsEditMode(false);
    const skillList = [...jobCategorySkillsResults];
    swal({
      title: 'Create New Job Category',
      button: false,
      className: 'create-jc-modal',
      content: (
        <CreateJobCategoryModal refSkills={skillList} dispatch={dispatch} />
      ),
    });
  };

  const submitEdit = (() => {
    const inclusions = [];
    loadedSkillIds.forEach(() => inclusions.push('1'));
    const inputs = {
      inclusion_ind: inclusions,
      category_id: selectedJobCategory,
      category_name: jobCategoriesResults.find((cat) => cat.id === '17')?.description,
      update_date: format(new Date(), DATE_FORMAT),
      skill_codes: [...selectedSkillIds],
    };
    clearInputs();
    console.log(inputs);
  });

  return (
    <div className="admin-job-categories-page">
      <ProfileSectionTitle title="Job Categories" icon="map" />
      <div>
        <div className="modal-controls">
          <button
            onClick={() => newJobCategoryModal()}
          >
              Create New Job Category
          </button>
        </div>
        <div className="select-container">
          <label htmlFor="categories-select">Select A Job Category</label>
          <select
            className={`${isEditMode ? 'disabled-bg' : 'select-dropdown'}`}
            onChange={(e) => setSelectedJobCategory(e.target.value)}
            disabled={isEditMode}
          >
            <option value="">--Please Select a Job Category--</option>
            {
              jobCategoriesResults?.map(category => (
                <option value={category.id}>
                  {category.description}
                </option>
              ))
            }
          </select>
        </div>
      </div>
      <div className="jc-toggle-container">
        <ToggleButton
          labelTextRight="Toggle Edit Mode"
          onChange={() => setIsEditMode(!isEditMode)}
          checked={isEditMode}
          onColor="#0071BC"
        />
      </div>
      <div>
        <table className="custom-table">
          <thead>
            <tr className="jc-table-row">
              <th className="checkbox-pos">
                <CheckBox
                  className="tm-checkbox-transparent"
                  checked={!selectAll}
                  onCheckBoxClick={handleSelectAll}
                  disabled={!isEditMode}
                />
              </th>
              <th className="skill-code-column">
                Skill Code
              </th>
              <th className="skill-desc-column">
                Skill Description
              </th>
            </tr>
          </thead>
          <tbody>
            {
              jobCategorySkillsResults?.map(skill => (
                <tr key={skill.code}>
                  <td className="checkbox-pac checkbox-pos">
                    <CheckBox
                      className="tm-checkbox-transparent"
                      value={
                        selectedJobCategory !== '' ?
                          selectedSkillIds.includes(skill.code) || skill.display_skill === '1' : false
                      }
                      onCheckBoxClick={() => handleSelectSkill(skill)}
                      disabled={!isEditMode}
                    />
                  </td>
                  <td>{skill.code}</td>
                  <td>{skill.description}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <div className="modal-controls">
          <button
            onClick={() => submitEdit()}
            disabled={!isEditMode}
          >
              Submit
          </button>
          <button
            onClick={clearInputs}
            disabled={!isEditMode}
            className="usa-button-secondary saved-search-form-secondary-button"
          >
              Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(JobCategories);
