import { useState } from 'react';
import { useSelector } from 'react-redux';
import { get } from 'lodash';
import FA from 'react-fontawesome';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
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
  const statsSum = get(biddersData.stats, 'Sum', {})[selectedStat];

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
                !availableBiddersIsLoading && !statsSum && `There are no available bidders categorized by ${selectedStat}.`
              }
              {
                !availableBiddersIsLoading && !!statsSum &&
                <div className="usa-grid-full flex">
                  <div className="usa-width-one-fourth legend-container">
                    <h4>Available Bidders {selectedStat} Stats ({statsSum})</h4>
                    <div className="usa-grid-full legend">
                      {
                        stats.map(m => (
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
