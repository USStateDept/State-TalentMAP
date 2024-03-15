import { shallow } from 'enzyme';
import ProjectedVacancyCard from './ProjectedVacancyCard';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import resultsObject from '../../__mocks__/resultsObject';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


describe('ProjectedVacancyCard', () => {
  const result = {
    "bid_season_code": 29,
    "bid_season_description": "Summer 2024",
    "bureau_code": "150000",
    "bureau_short_description": "AF",
    "bureau_description": "Test Bureau",
    "organization_code": "353001",
    "organization_short_description": "ABIDJAN",
    "organization_description": null,
    "position_seq_num": 14673,
    "position_title": "Position",
    "position_number": "00000000",
    "position_pay_plan_code": "FO",
    "position_grade_code": "02",
    "position_skill_code": "3001",
    "position_skill_description": "CONSULAR AFFAIRS",
    "position_job_category_code": "2",
    "position_job_category_description": "Consular",
    "position_language_1_code": "FR",
    "position_language_2_code": null,
    "position_language_proficiency_code": "FR 3/3",
    "position_language_proficiency_description": "French 3/3",
    "future_vacancy_seq_num": 229743,
    "future_vacancy_seq_num_ref": null,
    "future_vacancy_override_code": null,
    "future_vacancy_override_description": null,
    "future_vacancy_comment": "Projected vacancy expired.",
    "future_vacancy_override_tour_end_date": "2023-07-18T00:00:00",
    "future_vacancy_system_indicator": "Y",
    "future_vacancy_status_code": "X",
    "future_vacancy_status_description": "Excluded",
    "future_vacancy_mc_indicator": "N",
    "future_vacancy_exclude_import_indicator": "Y",
    "assignment_seq_num": 299053,
    "assignment_seq_num_effective": 299053,
    "assignee_tour_end_date": "2023-07-18T00:00:00",
    "assignee": "vacant",
    "incumbent": "vacant",
    "incumbent_tour_end_date": "2024-06-13T00:00:00",
    "cycle_date_type_code": "6 Mo.",
    "assignment_status_code": "EF",
    "bidding_tool_differential_rate_number": "2",
    "bidding_tool_danger_rate_number": "3",
    "bidding_tool_most_difficult_to_staff_flag": null,
    "bidding_tool_service_need_differential_flag": null,
    "obc_url": null,
    "tour_of_duty_code": "D",
    "tour_of_duty_description": "2 YRS (1 R & R)",
    "unaccompanied_status_code": 9,
    "unaccompanied_status_description": "Adults and Children under 5",
    "position_overseas_indicator": "O",
    "state_country_code": "IV0000000",
    "state_country_description": "Cote D'Ivoire",
    "contact_name": null,
    "entry_level_indicator": null,
    "midlevel_cede_indicator": null,
    "location_code": "IV1000000",
    "location_description": "Cote D'Ivoire - ABIDJAN",
    "commuter_code": null,
    "commuter_description": null,
    "alternate_bureau_code": "280000",
    "alternate_bureau_description": "CA",
    "capsule_description": "Real data have been MASKED!",
    "capsule_position_description": "",
    "famer_link": "",
    "bidding_tool": "",
    "cycle_position_link": null,
    "bid_season_future_vacancy_indicator": "Y",
    "cycle_position_id": "false",
    "creator_id": 1,
    "created_date": "2022-07-22T18:10:44",
    "updater_id": 1,
    "updated_date": "2024-02-07T16:35:58"
  };

  it('is defined', () => {
    const wrapper = shallow(
      <Provider store={mockStore({})}>
        <MemoryRouter>
          <ProjectedVacancyCard.WrappedComponent data={result} />
        </MemoryRouter>
      </Provider>,
    );
    expect(wrapper).toBeDefined();
  });
});
