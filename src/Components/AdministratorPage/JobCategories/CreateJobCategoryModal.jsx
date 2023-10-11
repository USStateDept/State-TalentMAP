import PropTypes from 'prop-types';
import { useState } from 'react';
import swal from '@sweetalert/with-react';
import CheckBox from 'Components/CheckBox';
import { jobCategoriesAdminFetchData, jobCategoriesSaveNewCatIsLoading,
  jobCategoriesSaveNewCatSuccess, jobCategoriesSaveNewCategory } from 'actions/jobCategories';

const CreateJobCategoryModal = (props) => {
  const { dispatch, refSkills, setSelectedJobCategory, setIsEditMode } = props;

  const [selectedSkillIds, setSelectedSkillIds] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  const getSaveNewCatQuery = () => ({
    category_name: newCategoryName,
    skill_codes: [...selectedSkillIds],
  });

  const submitNewCategory = (() => {
    dispatch(jobCategoriesSaveNewCategory(getSaveNewCatQuery()));
    if (jobCategoriesSaveNewCatSuccess && !jobCategoriesSaveNewCatIsLoading) {
      dispatch(jobCategoriesAdminFetchData());
      setSelectedJobCategory('');
      setIsEditMode(false);
      swal.close();
    }
  });

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectAll(true);
      setSelectedSkillIds(
        refSkills?.map(skill => skill.code),
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
    setNewCategoryName('');
  });

  return (
    <div className="jc-modal-body">
      <div className="jc-modal-input">
        <input
          placeholder="Enter New Category Name"
          onChange={e => setNewCategoryName(e.target.value)}
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
              refSkills?.map(skill => (
                <tr key={skill.code}>
                  <td className="checkbox-pac checkbox-pos">
                    <CheckBox
                      className="tm-checkbox-transparent"
                      value={selectedSkillIds.includes(skill.code)}
                      onCheckBoxClick={() => handleSelectSkill(skill)}
                    />
                  </td>
                  <td>{skill.code}</td>
                  <td>{skill.description}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="modal-controls">
        <button
          onClick={() => submitNewCategory()}
        >
            Submit
        </button>
        <button
          onClick={() => {
            clearInputs();
            swal.close();
          }}
          className="usa-button-secondary saved-search-form-secondary-button"
        >
            Cancel
        </button>
      </div>
    </div>
  );
};

CreateJobCategoryModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  refSkills: PropTypes.arrayOf(PropTypes.string),
  setSelectedJobCategory: PropTypes.func.isRequired,
  setIsEditMode: PropTypes.func.isRequired,
};

CreateJobCategoryModal.defaultProps = {
  refSkills: [],
};

export default CreateJobCategoryModal;
