import { useState } from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { PieChart, Pie, Cell, Bar } from 'recharts';
import InteractiveElement from 'Components/InteractiveElement';
import { Row } from '../../Layout';


const AvailableBidderStats = (props) => {
  const [showMore, setShowMore] = useState(false);

  const {
    // eslint-disable-next-line no-unused-vars
    placeholderText,
  } = props;
  const data = [
    { name: 'OC: Overcompliment', value: 400 },
    { name: 'UA: Unassigned', value: 300 },
    { name: 'IT: In Transit', value: 300 },
    { name: 'AWOL: Absent without leave', value: 200 },
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


  return (
    <div className="usa-grid-full">
      <Row className="usa-grid-full">
        <div className="usa-grid-full toggle-more-container">
          <InteractiveElement className="toggle-more" onClick={() => setShowMore(!showMore)}>
            <h3>
              <FA name="pie-chart" />  Statistics  <FA name={`chevron-${showMore ? 'down' : 'right'}`} />
            </h3>
          </InteractiveElement>
        </div>
        {
          showMore &&
            <div className="usa-width-one-whole section">
              <h4>Status</h4>
              <div className="usa-width-one-whole">
                <div className="usa-width-three-fourths align-left">
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
                    <Bar dataKey="OC: Overcompliment" fill="#102f51" />
                    <Bar dataKey="UA: Unassigned" fill="#cc3334" />
                    <Bar dataKey="IT: In Transit" fill="#c49208" />
                    <Bar dataKey="AWOL: Absent without leave" fill="#2970bc" />
                  </PieChart>
                </div>
              </div>
            </div>
        }
      </Row>
    </div>
  );
};

AvailableBidderStats.propTypes = {
  placeholderText: PropTypes.string,
};

AvailableBidderStats.defaultProps = {
  placeholderText: '',
};

export default AvailableBidderStats;
