import { withRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jobCategoriesAdminFetchData, jobCategoriesFetchSkills } from 'actions/jobCategories';
import CheckBox from 'Components/CheckBox';
import ProfileSectionTitle from '../../ProfileSectionTitle';

const JobCategories = () => {
  const dispatch = useDispatch();
  const jobCategories = useSelector(state => state.jobCategoriesAdminFetchData);
  const jobCategoriesResults = jobCategories?.results?.QRY_LSTJOBCATS_REF;
  const jobCategorySkills = useSelector(state => state.jobCategoriesFetchSkills);
  // console.log('skills: ', jobCategorySkills?.results?.QRY_LSTSKILLS_REF);
  const jobCategorySkillsResults = jobCategorySkills?.results?.QRY_LSTSKILLS_REF;
  // console.log('results: ', jobCategorySkillsResults);


  const [selectedJobCategory, setSelectedJobCategory] = useState('');
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
  useEffect(() => {
    dispatch(jobCategoriesAdminFetchData());
    // dispatch(jobCategoriesFetchSkills());
    // getJobCategories();
  }, []);
  useEffect(() => {
    dispatch(jobCategoriesFetchSkills());
    console.log('selected category id: ', selectedJobCategory);
  }, [selectedJobCategory]);
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
                <CheckBox />
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
                <tr key={skill?.SKL_CODE}>
                  <td className="checkbox-pac checkbox-pos">
                    <CheckBox />
                  </td>
                  <td>{skill?.SKL_CODE}</td>
                  <td>{skill?.SKL_DESC}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withRouter(JobCategories);
