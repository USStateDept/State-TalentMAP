import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import FA from 'react-fontawesome';
import { Picky } from 'react-picky';
import PropTypes from 'prop-types';
import ReactModal from 'Components/ReactModal';
import Alert from 'Components/Alert';
import Spinner from 'Components/Spinner';
import ProfileSectionTitle from 'Components/ProfileSectionTitle/ProfileSectionTitle';
import BackButton from 'Components/BackButton';
import { bidAuditSecondFetchData, bidAuditSecondFetchModalData } from 'actions/bidAudit';
import { renderSelectionList } from 'utilities';
import BidAuditGradeCard from './BidAuditGradeCard';
import BidAuditGradeModal from './BidAuditGradeModal';

const BidAuditGrade = (props) => {
  const dispatch = useDispatch();

  const routeCycleID = props?.match.params.cycleId;
  const routeAuditID = props?.match.params.auditId;

  const bidAuditGradeData = useSelector(state => state.bidAuditSecondFetchData);
  const bidAuditGradeFetchLoading = useSelector(state => state.bidAuditSecondFetchDataLoading);
  const bidAuditGradeFetchError = useSelector(state => state.bidAuditSecondFetchDataErrored);

  const secondFetchOptions = useSelector(state => state.bidAuditSecondFetchModalData);
  const secondFetchOptionsLoading = useSelector(state => state.bidAuditSecondFetchModalDataLoading);
  const secondFetchOptionsErrored = useSelector(state => state.bidAuditSecondFetchModalDataErrored);

  const [openModal, setOpenModal] = useState(false);
  const [cardsInEditMode, setCardsInEditMode] = useState([]);
  const disableSearch = cardsInEditMode.length > 0;

  useEffect(() => {
    dispatch(bidAuditSecondFetchData(routeCycleID, routeAuditID, 'grade'));
    dispatch(bidAuditSecondFetchModalData(routeCycleID, routeAuditID, 'grade'));
  }, []);

  const onRefetchData = () => {
    dispatch(bidAuditSecondFetchData(routeCycleID, routeAuditID, 'grade'));
    setCardsInEditMode([]);
  };

  const onBidAuditGradeEdit = (editMode, id) => {
    if (editMode) {
      setCardsInEditMode([id]);
    } else {
      setCardsInEditMode(cardsInEditMode.filter(x => x !== id));
    }
  };

  // ======================================================================================= Filters
  const [bidAuditGradeData$, setBidAuditGradeData$] = useState(bidAuditGradeData?.in_categories);
  const [clearFilters, setClearFilters] = useState(false);

  const [selectedPositionGrades, setSelectedPositionGrades] = useState([]);
  const [selectedPositionSkills, setSelectedPositionSkills] = useState([]);
  const [selectedEmployeeGrades, setSelectedEmployeeGrades] = useState([]);
  const [selectedEmployeeSkills, setSelectedEmployeeSkills] = useState([]);
  const [selectedEmployeeTenures, setSelectedEmployeeTenures] = useState([]);

  const noFiltersSelected = [
    selectedPositionGrades,
    selectedPositionSkills,
    selectedEmployeeGrades,
    selectedEmployeeSkills,
    selectedEmployeeTenures].flat().length === 0;

  const resetFilters = () => {
    setSelectedPositionGrades([]);
    setSelectedPositionSkills([]);
    setSelectedEmployeeGrades([]);
    setSelectedEmployeeSkills([]);
    setSelectedEmployeeTenures([]);
    setClearFilters(false);
  };

  const filterData = () => {
    if (noFiltersSelected) return bidAuditGradeData?.at_grades;
    let filteredData = bidAuditGradeData?.at_grades;

    if (selectedPositionGrades.length > 0) {
      filteredData = filteredData.filter(category =>
        selectedPositionGrades.some(grade => grade.code === category.position_grade_code),
      );
    }
    if (selectedPositionSkills.length > 0) {
      filteredData = filteredData.filter(category =>
        selectedPositionSkills.some(skill => skill.code === category.position_skill_code),
      );
    }
    if (selectedEmployeeGrades.length > 0) {
      filteredData = filteredData.filter(category =>
        selectedEmployeeGrades.some(grade => grade.code === category.employee_grade_code),
      );
    }
    if (selectedEmployeeSkills.length > 0) {
      filteredData = filteredData.filter(category =>
        selectedEmployeeSkills.some(skill => skill.code === category.employee_skill_code),
      );
    }
    if (selectedEmployeeTenures.length > 0) {
      filteredData = filteredData.filter(category =>
        selectedEmployeeTenures.some(tenure => tenure.code === category.employee_tenure_code),
      );
    }
    return filteredData;
  };

  useEffect(() => {
    setBidAuditGradeData$(filterData);
    if (noFiltersSelected) {
      setClearFilters(false);
    } else {
      setClearFilters(true);
    }
  }, [
    selectedPositionGrades,
    selectedPositionSkills,
    selectedEmployeeGrades,
    selectedEmployeeSkills,
    selectedEmployeeTenures,
    bidAuditGradeData,
  ]);

  const getUniqData = (value, desc) => {
    const uniqFormattedGradeData = bidAuditGradeData?.at_grades?.reduce((acc, curr) => {
      const keyValue = curr[value];
      const isDuplicate = acc.some(x => x.code === keyValue);
      if (!isDuplicate) {
        if (desc) {
          acc.push({
            code: curr[value],
            text: curr[value] ? `(${curr[value]}) ${curr[desc]}` : 'None Listed',
          });
        } else acc.push({ code: curr[value], text: curr[value] || 'None Listed' });
      }
      return acc;
    }, []);
    return uniqFormattedGradeData;
  };

  const pickyProps = {
    numberDisplayed: 2,
    multiple: true,
    includeFilter: true,
    dropdownHeight: 255,
    renderList: renderSelectionList,
    includeSelectAll: true,
  };
  // ======================================================================================= Filters


  const noResults = bidAuditGradeData$?.length === 0;
  const getOverlay = () => {
    let overlay;
    if (bidAuditGradeFetchLoading || secondFetchOptionsLoading) {
      overlay = <Spinner type="bureau-results" class="homepage-position-results" size="big" />;
    } else if (bidAuditGradeFetchError || secondFetchOptionsErrored) {
      overlay = <Alert type="error" title="Error loading results" messages={[{ body: 'Please try again.' }]} />;
    } else if (noResults) {
      overlay = <Alert type="info" title="No results found" messages={[{ body: 'Please broaden your search criteria and try again.' }]} />;
    } else {
      return false;
    }
    return overlay;
  };

  return (
    <div className="position-search bid-audit-page">
      <div className="usa-grid-full position-search--header">
        <BackButton />
        <ProfileSectionTitle title="Bid Audit - At Grade" icon="keyboard-o" className="xl-icon" />

        <div className="filterby-container" >
          <div className="filterby-label">Filter by:</div>
          <span className="filterby-clear">
            {clearFilters &&
                  <button className="unstyled-button" onClick={resetFilters} disabled={disableSearch}>
                    <FA name="times" />
                  Clear Filters
                  </button>
            }
          </span>
        </div>

        <div className="usa-width-one-whole position-search--filters--cm">
          <div className="filter-div">
            <div className="ba-label">Position Grade:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Position Grade"
              options={getUniqData('position_grade_code')}
              valueKey="code"
              labelKey="text"
              onChange={setSelectedPositionGrades}
              value={selectedPositionGrades}
              disabled={disableSearch}
            />
          </div>
          <div className="filter-div">
            <div className="ba-label">Position Skill:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Position Skill"
              options={getUniqData('position_skill_code', 'position_skill_desc')}
              valueKey="code"
              labelKey="text"
              onChange={setSelectedPositionSkills}
              value={selectedPositionSkills}
              disabled={disableSearch}
            />
          </div>
          <div className="filter-div">
            <div className="ba-label">Employee Grade:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Employee Grade"
              options={getUniqData('employee_grade_code')}
              valueKey="code"
              labelKey="text"
              onChange={setSelectedEmployeeGrades}
              value={selectedEmployeeGrades}
              disabled={disableSearch}
            />
          </div>
          <div className="filter-div">
            <div className="ba-label">Employee Skill:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Employee Skill"
              options={getUniqData('employee_skill_code', 'employee_skill_desc')}
              valueKey="code"
              labelKey="text"
              onChange={setSelectedEmployeeSkills}
              value={selectedEmployeeSkills}
              disabled={disableSearch}
            />
          </div>
          <div className="filter-div">
            <div className="ba-label">Employee Tenure:</div>
            <Picky
              {...pickyProps}
              placeholder="Select Employee Tenure"
              options={getUniqData('employee_tenure_code', 'employee_tenure_desc')}
              valueKey="code"
              labelKey="text"
              onChange={setSelectedEmployeeTenures}
              value={selectedEmployeeTenures}
              disabled={disableSearch}
            />
          </div>
        </div>
      </div>

      {getOverlay() ||
        <div className="usa-width-one-whole position-search--results ">

          <span className="ba-subheading">
            <div className="ba-audit-info">{`Cycle Name: ${bidAuditGradeData?.audit_info?.cycle_name}`}</div>
            <div className="ba-audit-info">{`Positions Posted by: ${bidAuditGradeData?.audit_info?.posted_by_date}`}</div>
            <div className="ba-audit-info">{`Audit Number: ${bidAuditGradeData?.audit_info?.audit_number}`}</div>
            <div className="ba-audit-info">{`Audit Description: ${bidAuditGradeData?.audit_info?.audit_desc}`}</div>
            <div className="icon-text-link ml-10">
              <a role="button" tabIndex={0} onClick={() => setOpenModal(true)} >
                <FA name="plus" />Add New At Grade</a>
            </div>
          </span>
          <span className="ba-subheading">
            <div className="ba-audit-sub-info">Employee Grades, Skills and Tenures considered At-Grade for Positions this Cycle</div>
          </span>

          {
            disableSearch &&
            <Alert
              type="warning"
              title={'Edit Mode (Search Disabled)'}
              messages={[{
                body: 'Discard or save your edits before searching. ' +
                  'Filters are disabled if any cards are in Edit Mode.',
              },
              ]}
            />
          }

          <div className="usa-grid-full position-list ba-scroll-container">
            {
              bidAuditGradeData$?.map(positionData => (
                <BidAuditGradeCard
                  data={positionData}
                  cycleId={bidAuditGradeData?.audit_info?.cycle_id}
                  auditNbr={bidAuditGradeData?.audit_info?.audit_number}
                  options={secondFetchOptions}
                  refetchFunction={() => onRefetchData()}
                  key={positionData.id}
                  isOpen={cardsInEditMode?.includes(positionData?.id)}
                  onEditModeSearch={(editMode, id) =>
                    onBidAuditGradeEdit(editMode, id)}
                />
              ))
            }
          </div>
        </div>
      }
      <ReactModal open={openModal} setOpen={setOpenModal}>
        <BidAuditGradeModal setOpen={setOpenModal} options={secondFetchOptions} />
      </ReactModal>
    </div>
  );
};

BidAuditGrade.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      cycleId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      auditId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
};

BidAuditGrade.defaultProps = {
  match: {},
};

export default withRouter(BidAuditGrade);
