import { withRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jobCategoriesAdminFetchData, jobCategoriesFetchSkills } from 'actions/jobCategories';
import CheckBox from 'Components/CheckBox';
import ProfileSectionTitle from '../../ProfileSectionTitle';

const JobCategories = () => {
  const dispatch = useDispatch();
  const jobCategories = useSelector(state => state.jobCategoriesAdminFetchData);
  // remove QRY_LSTJOB etc.
  // TODO: change SKL_CODE etc to id and description
  // make sure request for skills is sent back correctly
  const jobCategoriesResults = jobCategories?.results;
  const jobCategorySkills = useSelector(state => state.jobCategoriesFetchSkills);
  // console.log('skills: ', jobCategorySkills?.results?.QRY_LSTSKILLS_REF);
  const jobCategorySkillsResults = jobCategorySkills?.results;
  // console.log('results: ', jobCategorySkillsResults);


  const [selectedJobCategory, setSelectedJobCategory] = useState('');
  const [checkedSkillIds, setCheckedSkillIds] = useState([]);
  console.log('checkedSkillIds: ', checkedSkillIds);
  const [selectAll, setSelectAll] = useState(false);
  // const jobCategories = ['management', 'test'];

  // console.log(test[1]);
  // const cyclePositions = data.results;
  // const [jobCategories, setJobCategories] = useState([]);
  // const getJobCategories = () => {
  //   const categoriesToReturn = [];
  //   cyclePositions.forEach((position) => {
  //     // if (!categoriesSoFar) categoriesSoFar = [];
  //     if (!categoriesToReturn.includes(position.pos_job_category_desc)) {
  //     //   categoriesToReturn.push(position.pos_job_category_desc);
  //     // }
  //       categoriesToReturn.push(
  //         <option value={position.pos_job_category_desc}>
  //           {position.pos_job_category_desc}
  //         </option>,
  //       );
  //     }
  //   });
  //   console.log(categoriesToReturn);
  //   setJobCategories(['Management', 'Construction Engineers']);
  // };
  // const tableHeaders = ['Skill Codes', 'Skill Description'];
  const getQuery = () => ({
    category_id: selectedJobCategory,
  });

  useEffect(() => {
    dispatch(jobCategoriesAdminFetchData());
    // dispatch(jobCategoriesFetchSkills());
    // getJobCategories();
  }, []);
  useEffect(() => {
    dispatch(jobCategoriesFetchSkills(getQuery()));
    console.log('selected category id: ', selectedJobCategory);
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
    if (checkedSkillIds.includes(skill.id)) {
      const filteredSkills = checkedSkillIds.filter(x => x !== skill.id);
      setCheckedSkillIds(filteredSkills);
    } else {
      setCheckedSkillIds([...checkedSkillIds, skill.id]);
    }
  });
  const handleSubmit = (() => {
    console.log('hello world!');
  });

  return (
    <div className="admin-job-categories-page">
      <ProfileSectionTitle title="Job Categories" icon="map" />
      <div className="select-container">
        <label htmlFor="categories-select">Select A Job Category</label>
        <select
          // disabled={disableMeetingType}
          className="select-dropdown"
          // value={panelMeetingType}
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
                <tr key={skill?.id}>
                  <td className="checkbox-pac checkbox-pos">
                    <CheckBox
                      value={checkedSkillIds.includes(skill.id)}
                      onCheckBoxClick={() => handleSelectSkill(skill)}
                    />
                  </td>
                  <td>{skill?.id}</td>
                  <td>{skill?.id}</td>
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
