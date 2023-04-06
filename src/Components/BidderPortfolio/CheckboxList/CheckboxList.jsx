import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import InteractiveElement from 'Components/InteractiveElement';
import { CLASSIFICATIONS, CLIENT_CLASSIFICATIONS, EMPTY_FUNCTION } from 'Constants/PropTypes';
import { Row } from '../../Layout';
import ClientBadge from '../ClientBadge';
import GlossaryTermTrigger from '../../GlossaryTermTrigger';

const CheckboxList = ({ list, editView, updateClassifications,
  input, isPublic }) => {
  const [showMore, setShowMore] = useState({});

  useEffect(() => {
    // setting up showMore vars for classifications that have a season attached
    // eslint-disable-next-line no-param-reassign
    setShowMore(list.reduce((a, c) => { if (c.seasons.length > 1) { a[c.text.split(' ')[0]] = false; } return a; }, {}));
  }, []);

  function updateShowMore(uniqShowMore) {
    const newVal = !showMore[uniqShowMore];
    setShowMore({ ...showMore, [uniqShowMore]: newVal });
  }

  return (
    <div className="client-checkbox-list">
      <div className="usa-width-one-whole">
        <div className="static-client-badge" /> <div>Bidder Has Classification</div>
      </div>
      <div className={`usa-width-one-whole${!isPublic ? ' classifications-client-badges-container' : ''}`}>
        {list.map((c) => {
          let checked = false;
          let uniqueShowMore = '';
          const multiBidSeasonFlag = c.seasons.length > 1;
          if (multiBidSeasonFlag) {
            uniqueShowMore = c.text.split(' ')[0];
          }
          input.forEach((item) => {
            c.seasons.forEach((cs) => { if (cs.id === item) checked = true; });
          });

          return (
            <div className="classifications-client-badges" key={c.code}>
              {multiBidSeasonFlag &&
              <div>
                <Row className="usa-grid-full">
                  <div className="usa-grid-full toggle-more-container">
                    <ClientBadge
                      key={c.seasons[0].id}
                      type={c}
                      id={c.seasons[0].id}
                      status={checked}
                      showShortCode={false}
                      editView={editView}
                    />
                    <div className="classifications-badges-text">
                      {c.text}
                    </div>
                    <GlossaryTermTrigger className="classifications-glossary-link" icon="book" hideMissingTerm term={c.glossary_term} />
                    <InteractiveElement className="toggle-more classifications-row" onClick={() => updateShowMore(uniqueShowMore)}>
                      <FontAwesome
                        name={`chevron-${showMore[uniqueShowMore] ? 'down' : 'right'}`}
                      />
                    </InteractiveElement>
                  </div>
                  {
                    showMore[uniqueShowMore] &&
                    <div className="multiBidSeasonDropdown">
                      {c.seasons.map((m) => {
                        let multiBidSeasonChecked = false;
                        input.forEach((item) => {
                          if (m.id === item) { multiBidSeasonChecked = true; }
                        });
                        return (
                          <div className="multiBidSeason">
                            <ClientBadge
                              key={m.id}
                              type={c}
                              id={m.id}
                              status={multiBidSeasonChecked}
                              showShortCode={false}
                              onChange={updateClassifications}
                              editView={editView}
                            />

                            <div className="classifications-season-text">
                              {m.season_text}
                            </div>
                          </div>
                        );
                      })
                      }
                    </div>
                  }
                </Row>
              </div>
              }
              {!multiBidSeasonFlag &&
                <div>
                  <ClientBadge
                    key={c.seasons[0].id}
                    type={c}
                    id={c.seasons[0].id}
                    status={checked}
                    showShortCode={false}
                    onChange={updateClassifications}
                    editView={editView}
                  />
                  <div className="classifications-badges-text">
                    {c.text}
                  </div>
                  <GlossaryTermTrigger className="classifications-glossary-link" hideMissingTerm icon="book" term={c.glossary_term} />
                </div>
              }
            </div>
          );
        })
        }
      </div>
    </div>
  );
};

CheckboxList.propTypes = {
  list: CLASSIFICATIONS,
  editView: PropTypes.bool,
  updateClassifications: PropTypes.func,
  input: CLIENT_CLASSIFICATIONS,
  isPublic: PropTypes.bool,
};

CheckboxList.defaultProps = {
  isDisabled: false,
  list: [],
  input: [],
  editView: false,
  updateClassifications: EMPTY_FUNCTION,
  isPublic: false,
};

export default CheckboxList;
