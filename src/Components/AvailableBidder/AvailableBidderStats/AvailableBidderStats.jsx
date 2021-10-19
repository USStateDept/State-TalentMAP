import { useState } from 'react';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import FA from 'react-fontawesome';
import { Cell, Pie, PieChart } from 'recharts';
import InteractiveElement from 'Components/InteractiveElement';
import LoadingText from 'Components/LoadingText';
import Picky from 'react-picky';
import { Row } from '../../Layout';

const AvailableBidderStats = () => {
  const [showMore, setShowMore] = useState(false);
  const [selectedStat, setSelectedStat] = useState('Status');

  const statOptions = [
    'Bureau',
    'Grade',
    'Post',
    'Skill',
    'Status',
    'TED',
  ];

  // App state
  const biddersData = useSelector(state => state.availableBiddersFetchDataSuccess);
  const availableBiddersIsLoading = useSelector(state => state.availableBiddersFetchDataLoading);

  const stats = get(biddersData.stats, selectedStat, []);
  const statsCount = get(biddersData.stats, 'Count', {})[selectedStat];

  const isNoBidders = !get(biddersData, 'results', []).length;

  return (
    !availableBiddersIsLoading && !statsCount && !!isNoBidders ?
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
                  <div className="label">Chart Stats:</div>
                  <Picky
                    placeholder="Select Stats"
                    value={selectedStat}
                    options={statOptions}
                    onChange={setSelectedStat}
                    multiple
                    includeFilter
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
                !availableBiddersIsLoading && !statsCount && `There are no available bidders categorized by ${selectedStat}.`
              }
              {
                !availableBiddersIsLoading && !!statsCount &&
                <div className="usa-grid-full flex">
                  <div className="usa-width-one-fourth legend-container">
                    <div className="usa-grid-full legend">
                      <h4>Available Bidders {selectedStat} Stats ({statsCount})</h4>
                      {
                        stats.map(m => (
                          <div className="flex legend-item">
                            <div
                              className="legend-square"
                              style={{ backgroundColor: m.color }}
                            />
                            {/* may need to remove percent */}
                            <div className="legend-text">{`(${m.value}) ${m.name} ${m.percent}`}</div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div className="usa-width-one-third chart-container">
                    <PieChart width={400} height={400}>
                      <Pie
                        data={stats}
                        cx={200}
                        cy={200}
                        labelLine={false}
                        outerRadius={180}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {
                        // eslint-disable-next-line react/no-array-index-key
                          stats.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
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
