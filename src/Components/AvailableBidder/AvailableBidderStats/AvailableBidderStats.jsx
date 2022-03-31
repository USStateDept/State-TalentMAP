import { useState } from 'react';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import FA from 'react-fontawesome';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import InteractiveElement from 'Components/InteractiveElement';
import LoadingText from 'Components/LoadingText';
import { getAvatarColor, sortGrades } from 'utilities';
import Picky from 'react-picky';
import { Row } from '../../Layout';

const AvailableBidderStats = () => {
  const [showMore, setShowMore] = useState(false);
  const [selectedStat, setSelectedStat] = useState('Post');

  const statOptions = [
    'Bureau',
    'CDO',
    'Grade',
    'OC Bureau',
    'Post',
    'Skill',
    'Status',
  ];

  // App state
  const biddersData = useSelector(state => state.availableBiddersFetchDataSuccess);
  const availableBiddersIsLoading = useSelector(state => state.availableBiddersFetchDataLoading);

  let stats = get(biddersData, 'stats', {})[selectedStat] || [];
  const statsSum = get(biddersData, 'stats.Sum', {})[selectedStat] || 0;

  // sorting grades to maintain consistency across the site
  if (selectedStat === 'Grade') {
    stats = stats.map(grade => ({ ...grade, code: grade.name }));
    stats.sort(sortGrades);
  }

  // adding colors
  const stats$ = stats.map(m => {
    const color = getAvatarColor((m.name), 6000).backgroundColor;
    return {
      ...m,
      color,
    };
  });

  const legendClass = stats$.length > 40 ? 'legend-large' : 'legend-small';

  const isNoBidders = !get(biddersData, 'results', []).length;

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
                <div className="filter-div">
                  <div className="label">Chart Statistics:</div>
                  <Picky
                    placeholder="Select Stats"
                    value={selectedStat}
                    options={statOptions}
                    onChange={setSelectedStat}
                    multiple
                    dropdownHeight={255}
                    valueKey="code"
                    labelKey="custom_description"
                  />
                </div>
              }
              {
                !!availableBiddersIsLoading && <LoadingText />
              }
              {
                !availableBiddersIsLoading && !statsSum && `There are no available bidders categorized by ${selectedStat}.`
              }
              {
                !availableBiddersIsLoading && !!statsSum &&
                <div className="usa-grid-full flex">
                  <div className="legend-container">
                    <h4>Available Bidders {selectedStat} Statistics ({statsSum})</h4>
                    <div className={`usa-grid-full ${legendClass}`}>
                      {
                        stats$.map(m => (
                          <div className="flex legend-item">
                            <div
                              className="legend-square"
                              style={{ backgroundColor: m.color }}
                            />
                            {
                              selectedStat === 'Grade' ?
                                <div className="legend-text">
                                  {m.name}
                                  <span className="percent-text">
                                    {`${m.percent}`}
                                  </span>
                                  {`(${m.value})`}
                                </div> :
                                <div className="legend-text">
                                  {`(${m.value}) ${m.name}`}
                                  <span className="percent-text">
                                    {`${m.percent}`}
                                  </span>
                                </div>
                            }
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div className="chart-container">
                    <PieChart width={400} height={400}>
                      <Pie
                        data={stats$}
                        cx={200}
                        cy={200}
                        labelLine={false}
                        outerRadius={180}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {
                        // eslint-disable-next-line react/no-array-index-key
                          stats$.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
                        }
                      </Pie>
                      <Tooltip />
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
