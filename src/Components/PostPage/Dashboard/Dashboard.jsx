import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { includes } from 'lodash';
import { Cell, Pie, PieChart } from 'recharts';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import Spinner from '../../Spinner';
import SelectForm from '../../SelectForm';
import { Column, Row } from '../../Layout';


const PostPage = (props) => {
  const {
    placeholderText,
  } = props;
  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const COLORS = ['#102f51', '#cc3334', '#c49208', '#2970bc'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    // eslint-disable-next-line react/prop-types
    cx, cy, midAngle, innerRadius, outerRadius, percent,
  }) => {
    const radius = (innerRadius + (outerRadius - innerRadius)) * 0.5;
    const x = cx + (radius * Math.cos(-midAngle * RADIAN));
    const y = cy + (radius * Math.sin(-midAngle * RADIAN));

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const bidCycles = [
    { value: null, text: 'Select Cycle' },
    { value: 'Fall 2020', text: 'Fall 2020' },
    { value: 'Winter 2020', text: 'Winter 2020' },
    { value: 'Spring 2021', text: 'Spring 2021' },
    { value: 'Summer 2021', text: 'Summer 2021' },
    { value: 'Fall 2021', text: 'Fall 2021' },
    { value: 'Winter 2021', text: 'Winter 2021' },
  ];

  const countries = [
    'Bahamas', 'Andorra', 'Vanuatu', 'Malawi', 'Equatorial Guinea', 'Sierra Leone', 'Mozambique',
    'France', 'Sudan', 'Iran', 'Malta', 'Papua New Guinea', 'Congo', 'Nauru', 'Guatemala',
    'Wallis and Futuna', 'Madagascar', 'Virgin Islands', 'Saint Pierre and Miquelon', 'Tajikistan',
    'Trinidad and Tobago', 'Iceland', 'Italy', 'Panama', 'Lithuania'];

  return (
    <div className="usa-grid-full profile-content-inner-container position-search">
      { !placeholderText &&
          <Spinner type="homepage-position-results" size="big" />
      }
      <div className="usa-grid-full">
        <ProfileSectionTitle title="Post Dashboard" icon="tachometer" />
      </div>
      <div className="usa-grid-full">
        <Row className="usa-grid-full">
          <div className="usa-width-one-whole section">
            <h3>Positions Filled</h3>
            {placeholderText}
            <div className="all-inline">
              <SelectForm
                id="bid-cycle"
                options={bidCycles}
                label="Bid Cycle"
              />
            </div>
            <div className="usa-width-one-whole">
              <div className="usa-width-one-fourth align-middle">
                <PieChart width={400} height={400}>
                  <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={180}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {
                      // eslint-disable-next-line react/no-array-index-key
                      data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                  </Pie>
                </PieChart>
                <div>All: 130/150</div>
              </div>
              <div className="usa-width-three-fourths">
                <div className="main-selector">
                  <FA name="dot-circle-o" />
                  <span>WHA (All positions)</span>
                </div>
                {countries.map((m) => {
                  const isSelected = includes(['Nauru', 'Malawi', 'Sudan', 'Guatemala', 'Italy'], m);
                  return (
                    <Column columns={2}>
                      <FA name={isSelected ? 'dot-circle-o' : 'circle-o'} />
                      <span>{m}</span>
                    </Column>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="usa-width-one-whole section">
            <h3>Notifications</h3>
          </div>
        </Row>
      </div>
    </div>
  );
};

PostPage.propTypes = {
  placeholderText: PropTypes.string,
};

PostPage.defaultProps = {
  placeholderText: '',
};

export default PostPage;
