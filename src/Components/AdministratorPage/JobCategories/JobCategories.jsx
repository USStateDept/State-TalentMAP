import { withRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jobCategoriesAdminFetchData, jobCategoriesFetchSkills } from 'actions/jobCategories';
import ToggleButton from 'Components/ToggleButton';
import CheckBox from 'Components/CheckBox';
import ProfileSectionTitle from '../../ProfileSectionTitle';

const JobCategories = () => {
  const dispatch = useDispatch();

  const jobCategories = useSelector(state => state.jobCategoriesAdminFetchData);
  const jobCategorySkills = useSelector(state => state.jobCategoriesFetchSkills);

  const jobCategoriesResults = jobCategories?.data;
  const jobCategorySkillsResults = jobCategorySkills?.data;

  const [selectedJobCategory, setSelectedJobCategory] = useState('');
  const [checkedSkillIds, setCheckedSkillIds] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const getQuery = () => ({
    category_id: selectedJobCategory,
  });

  useEffect(() => {
    dispatch(jobCategoriesAdminFetchData());
  }, []);

  useEffect(() => {
    dispatch(jobCategoriesFetchSkills(getQuery()));
    setCheckedSkillIds([]);
  }, [selectedJobCategory]);

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectAll(true);
      setCheckedSkillIds(
        jobCategorySkillsResults?.map(skill => skill.code),
      );
    } else {
      setSelectAll(false);
      setCheckedSkillIds([]);
    }
  };

  const handleSelectSkill = (skill => {
    if (checkedSkillIds.includes(skill.code)) {
      const filteredSkills = checkedSkillIds.filter(x => x !== skill.code);
      setCheckedSkillIds(filteredSkills);
    } else {
      setCheckedSkillIds([...checkedSkillIds, skill.code]);
    }
  });

  return (
    <div className="admin-job-categories-page">
      <ProfileSectionTitle title="Job Categories" icon="map" />
      <div>
        <div className="modal-controls">
          <button>Create New Job Category</button>
          {/* <button onClick={setIsEditMode(!isEditMode)}>Toggle Edit Mode</button> */}
        </div>
        <div className="select-container">
          <label htmlFor="categories-select">Select A Job Category</label>
          <select
            className="select-dropdown"
            onChange={(e) => setSelectedJobCategory(e.target.value)}
          >
            <option>--Please Select a Job Category--</option>
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
                      value={checkedSkillIds.includes(skill.code) || skill.display_skill === '1'}
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
            // onClick={handleSubmit}
            disabled={!isEditMode}
          >
              Submit
          </button>
          <button
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
