import { withRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jobCategoriesAdminFetchData } from 'actions/cycleManagement';
import CheckBox from 'Components/CheckBox';
import ProfileSectionTitle from '../../ProfileSectionTitle';

const JobCategories = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.jobCategoriesAdminFetchData);
  // const cyclePositions = data.results;
  const jobCategories = ['Management', 'Construction Engineers', 'Consular', 'Diplomatic Courier'];
  // const [jobCategories, setJobCategories] = useState([]);
  console.log(data.results);
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
    // getJobCategories();
  }, []);
  return (
    <div className="admin-job-categories-page">
      <ProfileSectionTitle title="Job Categories" icon="map" />
      <div className="select-container">
        <label htmlFor="categories-select">Select A Job Category</label>
        <select
          // disabled={disableMeetingType}
          className="select-dropdown"
          // value={panelMeetingType}
          // onChange={(e) => setPanelMeetingType(e.target.value)}
        >
          {
            jobCategories.map(category => (
              <option value={category}>
                {category}
              </option>
            ))
          }
        </select>
      </div>
      <div>
        <table className="custom-table">
          <thead>
            <tr>
              <th className="checkbox-pos">
                <CheckBox />
                Skill Code
              </th>
              <th>
                Skill Description
              </th>
            </tr>
          </thead>
          <tbody>
            {
              'hello world'
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withRouter(JobCategories);
