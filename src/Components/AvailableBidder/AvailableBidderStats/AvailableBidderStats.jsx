/* eslint-disable indent */
/* eslint-disable sort-imports */
/* eslint-disable max-len */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import numeral from 'numeral';
import FA from 'react-fontawesome';
import { Pie, PieChart, Cell } from 'recharts';
import InteractiveElement from 'Components/InteractiveElement';
import LoadingText from 'Components/LoadingText';
import { Row } from '../../Layout';


const AvailableBidderStats = () => {
  const [showMore, setShowMore] = useState(false);

  // App state
  const biddersData = useSelector(state => state.availableBiddersFetchDataSuccess);
  const availableBiddersIsLoading = useSelector(state => state.availableBiddersFetchDataLoading);

  const stats = get(biddersData, 'stats', {});

  const statsSum = Object.values(stats).reduce((a, b) => a + b, 0);

  let data = [
    { name: 'Overcompliment (OC)', key: 'OC', value: 0, color: '#112E51' },
    { name: 'Unassigned (UA)', key: 'UA', value: 0, color: '#205493' },
    { name: 'In Transit (IT)', key: 'IT', value: 0, color: '#9BDAF1' },
    { name: 'Absent without leave (AWOL)', key: 'AWOL', value: 0, color: '#02BFE7' },
    { name: 'Skill', key: 'AWOL', value: 0, color: '#E2C2C6' },
    { name: 'Grade', key: 'AWOL', value: 0, color: '#B9929F' },
    { name: 'Location', key: 'AWOL', value: 0, color: '#9C528B' },
    { name: 'TED', key: 'AWOL', value: 0, color: '#610F7F' },
    { name: 'Bureau', key: 'AWOL', value: 0, color: '#2F0147' },
  ];

  data = data.map(m => ({ ...m, value: get(stats, m.key, 0) }));

  const data$ = data.map(m => {
    // handling division by zero
    const sum = statsSum !== 0 ? statsSum : 1;
    return {
      ...m,
      percent: numeral(m.value / sum).format('0%'),
    };
  });

  const chartData$ = data$.filter(f => f.value > 0);
  console.log('biddersData', biddersData);
  console.log('stats', stats);
  console.log('data', data);
  console.log('data$', data$);
  console.log('chartdata', chartData$);

  // const testData = [
  //   { name: 'Skill', key: 'OC', value: 1, color: '#112E51' },
  //   { name: 'Grade', key: 'OC', value: 1, color: '#112E51' },
  //   { name: 'Post', key: 'OC', value: 1, color: '#112E51' },
  //   { name: 'Bureau', key: 'OC', value: 1, color: '#112E51' },
  // ];

  const isNoBidders = !get(biddersData, 'results', []).length;

  // const data01 = [
  //   { name: 'Skill', value: 400 },
  //   { name: 'Grade', value: 300 },
  //   { name: 'Location', value: 100 },
  //   { name: 'Group D', value: 200 },
  // ];
  // const data02 = [
  //   { name: 'A1', value: 100 },
  //   { name: 'A2', value: 300 },
  //   { name: 'B1', value: 100 },
  //   { name: 'B2', value: 80 },
  //   { name: 'B3', value: 40 },
  //   { name: 'B4', value: 30 },
  //   { name: 'B5', value: 50 },
  //   { name: 'C1', value: 100 },
  //   { name: 'C2', value: 200 },
  //   { name: 'D1', value: 150 },
  //   { name: 'D2', value: 50 },
  // ];

  // const data3 = [
  //   { name: 'Group A', value: 400 },
  //   { name: 'Group B', value: 300 },
  //   { name: 'Group C', value: 300 },
  //   { name: 'Group D', value: 200 },
  // ];
  // const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    !availableBiddersIsLoading && !statsSum && !!isNoBidders ?
      null :
      <div className="usa-grid-full available-bidders-stats">
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
            <div className="usa-grid-full section statistics-section">
              {
                !!availableBiddersIsLoading && <LoadingText />
              }
              {
                !availableBiddersIsLoading && !statsSum && 'There are no available bidders categorized by status.'
              }
              {
                !availableBiddersIsLoading && !!statsSum &&
                <div className="usa-grid-full flex">
                  <div className="usa-width-one-fourth legend-container">
                    <div className="usa-grid-full legend">
                      <h4>Available Bidders Stats ({statsSum})</h4>
                      {
                        data$.map(m => (
                          <div className="flex legend-item">
                            <div
                              className="legend-square"
                              style={{ backgroundColor: m.color }}
                            />
                            <div className="legend-text">{`(${m.value}) ${m.name} ${m.percent}`}</div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div className="usa-width-one-third chart-container">
                    <PieChart width={400} height={400}>
                      <Pie
                        data={chartData$}
                        cx={200}
                        cy={200}
                        labelLine={false}
                        outerRadius={180}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {
                        // eslint-disable-next-line react/no-array-index-key
                          chartData$.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
                        }
                      </Pie>
                    </PieChart>
                  </div>
                  {/* <div className="usa-width-one-third chart-container"> */}
                  {/* <PieChart width={400} height={400}>
                      <Pie data={data02} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" />
                      <Pie data={data01} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
                      <Tooltip />
                    </PieChart> */}
                  {/* </ResponsiveContainer> */}
                  {/* </div> */}
                  {/* <div className="usa-width-one-third chart-container">
                    <PieChart width={800} height={400}>
                      <Pie
                        data={data3}
                        cx={120}
                        cy={200}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {data3.map((entry, index) => (
                          <Cell fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie> */}
                      {/* <Pie
                        data={data3}
                        cx={420}
                        cy={200}
                        startAngle={180}
                        endAngle={0}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {data.map((entry, index) => (
                          <Cell fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie> */}
                    {/* </PieChart> */}
                  {/* </div> */}
                </div>
              }
            </div>
            }
          </Row>
        </div>
      </div>
  );
};

export default AvailableBidderStats;
