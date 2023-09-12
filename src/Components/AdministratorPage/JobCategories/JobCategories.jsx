import { withRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jobCategoriesAdminFetchData, jobCategoriesFetchSkills } from 'actions/jobCategories';
import CheckBox from 'Components/CheckBox';
import ProfileSectionTitle from '../../ProfileSectionTitle';

const JobCategories = () => {
  const dispatch = useDispatch();
  const jobCategories = useSelector(state => state.jobCategoriesAdminFetchData);
  console.log('jobCategories: ', jobCategories);
  // remove QRY_LSTJOB etc.
  // TODO: change SKL_CODE etc to id and description
  // make sure request for skills is sent back correctly
  const jobCategoriesResults = jobCategories?.results;
  const jobCategorySkills = useSelector(state => state.jobCategoriesFetchSkills);
  console.log('skills: ', jobCategorySkills);
  // console.log('skills: ', jobCategorySkills?.results?.QRY_LSTSKILLS_REF);
  const jobCategorySkillsResults = jobCategorySkills?.results;
  // console.log('results: ', jobCategorySkillsResults);


  const [selectedJobCategory, setSelectedJobCategory] = useState('');
  const [checkedSkillIds, setCheckedSkillIds] = useState([]);
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
        jobCategorySkillsResults?.map(skill => skill.id),
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
          <button onClick={handleSubmit}>Create New Job Category</button>
          <button onClick={handleSubmit}>Delete Selected Job Category</button>
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
                />
              </th>
              <th>
                Skill Code
              </th>
              <th>
                Skill Description
              </th>
            </tr>
          </thead>
          <tbody>
            {
              jobCategorySkillsResults?.map(skill => (
                <tr key={skill?.code}>
                  <td className="checkbox-pac checkbox-pos">
                    <CheckBox
                      value={checkedSkillIds.includes(skill.code)}
                      onCheckBoxClick={() => handleSelectSkill(skill)}
                    />
                  </td>
                  <td>{skill?.code}</td>
                  <td>{skill?.description}</td>
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
