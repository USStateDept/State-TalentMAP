/* eslint-disable no-console */
/* eslint-disable max-len */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import numeral from 'numeral';
import FA from 'react-fontawesome';
import { Cell, Pie, PieChart } from 'recharts';
import InteractiveElement from 'Components/InteractiveElement';
import LoadingText from 'Components/LoadingText';
import Picky from 'react-picky';
import { Row } from '../../Layout';


const AvailableBidderStats = () => {
  const [showMore, setShowMore] = useState(false);

  // App state
  const biddersData = useSelector(state => state.availableBiddersFetchDataSuccess);
  const availableBiddersIsLoading = useSelector(state => state.availableBiddersFetchDataLoading);

  const stats = get(biddersData, 'stats', {});

  const statsSum = Object.values(get(stats, 'status', {})).reduce((a, b) => a + b, 0);

  let data = [
    {
      status: [
        { name: 'Overcompliment (OC)', key: 'OC', value: 0, color: '#112E51' },
        { name: 'Unassigned (UA)', key: 'UA', value: 0, color: '#205493' },
        { name: 'In Transit (IT)', key: 'IT', value: 0, color: '#9BDAF1' },
        { name: 'Absent without leave (AWOL)', key: 'AWOL', value: 0, color: '#02BFE7' },
      ],
      grade: [
        { name: 'Grade 01', key: '01', value: 0, color: '#112E51' },
        { name: 'Grade 02', key: '02', value: 0, color: '#205493' },
        { name: 'Grade 03', key: '03', value: 0, color: '#112E51' },
        { name: 'Grade 04', key: '04', value: 0, color: '#205493' },
        { name: 'Grade 05', key: '05', value: 0, color: '#112E51' },
        { name: 'Grade 06', key: '06', value: 0, color: '#205493' },
        { name: 'Grade 07', key: '07', value: 0, color: '#112E51' },
        { name: 'Grade 08', key: '08', value: 0, color: '#205493' },
        { name: 'Multiple Grades Considered (00)', key: '00', value: 0, color: '#112E51' },
        { name: 'MC Minister-Counserlor (MC)', key: 'MC', value: 0, color: '#205493' },
        { name: 'OC Counselor (FE-OC)', key: 'OC', value: 0, color: '#112E51' },
        { name: 'Office Manager (OM)', key: 'OM', value: 0, color: '#205493' },
      ],
    },
  ];

  data = data[0].status.map(m => ({ ...m, value: get(stats.status, m.key, 0) }));

  const data$ = data.map(m => {
    // handling division by zero
    const sum = statsSum !== 0 ? statsSum : 1;
    return {
      ...m,
      percent: numeral(m.value / sum).format('0%'),
    };
  });

  const chartData$ = data$.filter(f => f.value > 0);

  const isNoBidders = !get(biddersData, 'results', []).length;

  const statOptions = [
    'Grade',
    'Status',
  ];
  const selectedStat = 'Status';

  const showGradeChart = true;

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
            {/* {
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
                      <h4>Available Bidders Status Stats ({statsSum})</h4>
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
                </div>
              }
            </div>
            } */}
            {
              showMore &&
            <div className="usa-grid-full section statistics-section">
              {
                showGradeChart &&
                <div className="filter-div">
                  <div className="label">Chart Stats:</div>
                  <Picky
                    placeholder="Select Stats"
                    value={selectedStat}
                    options={statOptions}
                    // onChange={setSelectedSkills}
                    numberDisplayed={2}
                    multiple
                    includeFilter
                    dropdownHeight={255}
                    valueKey="code"
                    labelKey="custom_description"
                    includeSelectAll
                  />
                </div>
              }
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
                      <h4>Available Bidders Status Stats ({statsSum})</h4>
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
