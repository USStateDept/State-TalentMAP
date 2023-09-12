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
  console.log('jobCategories: ', jobCategories);
  const jobCategoriesResults = jobCategories?.data;
  const jobCategorySkills = useSelector(state => state.jobCategoriesFetchSkills);
  console.log('skills: ', jobCategorySkills);
  // console.log('skills: ', jobCategorySkills?.results?.QRY_LSTSKILLS_REF);
  const jobCategorySkillsResults = jobCategorySkills?.data;
  // console.log('results: ', jobCategorySkillsResults);


  const [selectedJobCategory, setSelectedJobCategory] = useState('');
  const [checkedSkillIds, setCheckedSkillIds] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  // console.log('checkedSkillIds: ', checkedSkillIds);
  const [selectAll, setSelectAll] = useState(false);

  const getQuery = () => ({
    category_id: selectedJobCategory,
  });

  useEffect(() => {
    dispatch(jobCategoriesAdminFetchData());
  }, []);

  useEffect(() => {
    dispatch(jobCategoriesFetchSkills(getQuery()));
    // console.log('selected category id: ', selectedJobCategory);
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

  const handleSubmit = (() => {
    console.log('hello world!');
  });

  return (
    <div className="admin-job-categories-page">
      <ProfileSectionTitle title="Job Categories" icon="map" />
      <div>
        <div className="modal-controls">
          {/* <button onClick={handleSubmit}>Create New Job Category</button> */}
          {/* <button onClick={setIsEditMode(!isEditMode)}>Toggle Edit Mode</button> */}
        </div>
        <div className="select-container">
          <label htmlFor="categories-select">Select A Job Category</label>
          <select
            className="select-dropdown"
            onChange={(e) => setSelectedJobCategory(e.target.value)}
          >
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
      <div>
        <table className="custom-table">
          <thead>
            <tr className="jc-table-row">
              <th className="checkbox-pos">
                <CheckBox
                  checked={!selectAll}
                  onCheckBoxClick={handleSelectAll}
                  disabled={isEditMode}
                />
              </th>
              <th className="skill-code-column">
                Skill Code
              </th>
              <th className="skill-desc-column">
                Skill Description
              </th>
              <th>
                <ToggleButton
                  labelTextRight="Toggle Edit Mode"
                  onChange={() => setIsEditMode(!isEditMode)}
                  checked={isEditMode}
                  onColor="#0071BC"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {
              jobCategorySkillsResults?.map(skill => (
                <tr key={skill.code}>
                  <td className="checkbox-pac checkbox-pos">
                    <CheckBox
                      value={checkedSkillIds.includes(skill.code) || skill.display_skill === '1'}
                      onCheckBoxClick={() => handleSelectSkill(skill)}
                      disabled={isEditMode}
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
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(JobCategories);
