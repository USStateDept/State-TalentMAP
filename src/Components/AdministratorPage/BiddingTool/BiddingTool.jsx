import { Link, withRouter } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { jobCategoriesAdminFetchData } from 'actions/jobCategories';
import { Column, Row } from 'Components/Layout';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import BiddingToolCard from './BiddingToolCard/BiddingToolCard';

const dummyData = [{
  id: 1,
  post: 'Abidjan, Cote Divoire',
  post_code: 'IV1000000',
  tod: '2 YRS (2 R & R)',
  r_point: 'Paris',
  cola: 25,
  differential_rate: 25,
  consumable_allowance: false,
  apo_fpo_dpo: false,
  danger_pay: null,
  snd: true,
  hds: true,
  unaccompanied_status: 'Fully Accompanied',
  housing_type: 'Government Owned/Leased',
  quarters: 'Furnished',
  school_year: 'Lorem ipsum',
  grade_adequater_education: 'Lorem ipsum',
  efm_employment_opportunities: 'Lorem ipsum',
  efm_issues: 'Lorem ipsum',
  medical: 'Lorem ipsum',
  remarks: 'Lorem ipsum',
}, {
  id: 2,
  post: 'Abidjan, Cote Divoire',
  post_code: 'IV1000000',
  tod: '2 YRS (2 R & R)',
  r_point: 'Paris',
  cola: 25,
  differential_rate: 25,
  consumable_allowance: false,
  apo_fpo_dpo: false,
  danger_pay: null,
  snd: true,
  hds: true,
  unaccompanied_status: 'Fully Accompanied',
  housing_type: 'Government Owned/Leased',
  quarters: 'Furnished',
  school_year: 'Lorem ipsum',
  grade_adequater_education: 'Lorem ipsum',
  efm_employment_opportunities: 'Lorem ipsum',
  efm_issues: 'Lorem ipsum',
  medical: 'Lorem ipsum',
  remarks: 'Lorem ipsum',
}];

const BiddingTool = (props) => {
  const id = props.match?.params?.id ?? false;

  const dispatch = useDispatch();
  console.log(props);

  useEffect(() => {
    dispatch(jobCategoriesAdminFetchData());
  }, []);

  if (id) {
    return (
      <div className="admin-job-categories-page">
        <ProfileSectionTitle title="Bidding Tool" icon="keyboard-o" />
        <div>
          <BiddingToolCard />
        </div>
      </div>
    );
  }
  return (
    <div className="admin-job-categories-page">
      <ProfileSectionTitle title="Bidding Tool" icon="keyboard-o" />
      <div>
        <div className="usa-grid-full results-dropdown controls-container">
          <div className="standard-add-button">
            <FA className="fa-solid fa-plus" name="new-bidding-tool" />
            <p>Create New Bidding Tool</p>
          </div>
        </div>
        {dummyData.map(d => (
          <Row fluid className="cycle-search-card box-shadow-standard">
            <Row fluid className="cyc-card--row">
              <Column columns={3}>
                {d.post_code}
              </Column>
              <Column columns={12} className="cyc-card--middle-cols">
                {d.post}
              </Column>
              <Column columns={3} className="cyc-card--link-col">
                <span>
                  <Link to={`/profile/administrator/biddingtool/${d.id}`}>
                    View / Edit
                  </Link>
                </span>
              </Column>
            </Row>
          </Row>
        ))}
      </div>
    </div>
  );
};

BiddingTool.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

BiddingTool.defaultProps = {
  match: {},
};

export default withRouter(BiddingTool);
