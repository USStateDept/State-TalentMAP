import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Row, Column } from '../../Layout';
import MediaQueryWrapper from '../../MediaQuery';
import DefinitionList, { Definition } from '../../DefinitionList';
import SavedSearchPillList from '../../SavedSearchPillList';
import { POSITION_DETAILS, MAPPED_PARAM_ARRAY } from '../../../Constants/PropTypes';
import { NO_UPDATE_DATE, GET_NOW_AVAILABLE, GET_POSITIONS_ADDED } from '../../../Constants/SystemMessages';
import { mapSavedSearchToDescriptions, formatDate } from '../../../utilities';

const SavedSearchListResultsCard = (props) => {
  const {
    savedSearch,
    goToSavedSearch,
    mappedParams,
    deleteSearch,
    isProjectedVacancy,
    availableCount,
    addedCount,
  } = props;

  const pills = mapSavedSearchToDescriptions(savedSearch.filters, mappedParams);
  const dateCreated = formatDate(get(savedSearch, 'date_created', null)) || NO_UPDATE_DATE;

  return (
    <MediaQueryWrapper breakpoint="screenSmMax" widthType="max">
      {(matches) => {
        const columns = !matches ? [3, 6, 3] : [12, 12, 12];
        return (
          <Column className={`saved-search-card-outer-container ${isProjectedVacancy ? 'search-card--projected-vacancy' : ''}`}>
            <Row className="saved-search-card profile-section-container" key={savedSearch.id} fluid>
              <Column columns={columns[0]} className="saved-search-data-points">
                <DefinitionList>
                  <Definition term="Name" definition={savedSearch.name} />
                  <Definition term="Created" definition={dateCreated} />
                </DefinitionList>
                {
                  !!(addedCount || availableCount) &&
                    <div className="search-notification-container">
                      {
                        !!availableCount &&
                          <span className="notification--primary">
                            {GET_NOW_AVAILABLE(availableCount)}
                          </span>
                      }
                      {
                        !!addedCount &&
                          <span className="notification--secondary">
                            {GET_POSITIONS_ADDED(addedCount)}
                          </span>
                      }
                    </div>
                }
              </Column>
              <Column columns={columns[1]}>
                <DefinitionList>
                  <Definition term="Your Selections">
                    <SavedSearchPillList pills={pills} isProjectedVacancy={isProjectedVacancy} />
                  </Definition>
                </DefinitionList>
              </Column>
              <Column columns={columns[2]}>
                <div className="button-container">
                  <div className="button-content">
                    <button className="usa-button-secondary" onClick={() => deleteSearch(savedSearch.id)} >Delete</button>
                    <button className="usa-button" onClick={() => goToSavedSearch(savedSearch)} >View Search</button>
                  </div>
                </div>
              </Column>
            </Row>
          </Column>
        );
      }}
    </MediaQueryWrapper>
  );
};

SavedSearchListResultsCard.propTypes = {
  savedSearch: POSITION_DETAILS.isRequired,
  goToSavedSearch: PropTypes.func.isRequired,
  mappedParams: MAPPED_PARAM_ARRAY.isRequired,
  deleteSearch: PropTypes.func.isRequired,
  isProjectedVacancy: PropTypes.bool,
  availableCount: PropTypes.number,
  addedCount: PropTypes.number,
};

SavedSearchListResultsCard.defaultProps = {
  isProjectedVacancy: false,
  availableCount: 0,
  addedCount: 0,
};

export default SavedSearchListResultsCard;
