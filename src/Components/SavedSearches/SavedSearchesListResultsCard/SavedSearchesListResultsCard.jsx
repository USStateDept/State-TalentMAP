import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Row, Column } from '../../Layout';
import MediaQueryWrapper from '../../MediaQuery';
import DefinitionList, { Definition } from '../../DefinitionList';
import SavedSearchPillList from '../../SavedSearchPillList';
import { POSITION_DETAILS, MAPPED_PARAM_ARRAY } from '../../../Constants/PropTypes';
import { NO_UPDATE_DATE } from '../../../Constants/SystemMessages';
import { mapSavedSearchToDescriptions, formatDate } from '../../../utilities';

const SavedSearchListResultsCard = (props) => {
  const {
    savedSearch,
    goToSavedSearch,
    mappedParams,
    deleteSearch,
  } = props;

  const pills = mapSavedSearchToDescriptions(savedSearch.filters, mappedParams);
  const dateCreated = formatDate(get(savedSearch, 'date_created', null)) || NO_UPDATE_DATE;

  return (
    <MediaQueryWrapper breakpoint="screenSmMax" widthType="max">
      {(matches) => {
        const columns = !matches ? [3, 6, 3] : [12, 12, 12];
        return (
          <Row className="saved-search-card profile-section-container" key={savedSearch.id} fluid>
            <Column columns={columns[0]}>
              <DefinitionList>
                <Definition term="Name" definition={savedSearch.name} />
                <Definition term="Created" definition={dateCreated} />
              </DefinitionList>
            </Column>
            <Column columns={columns[1]}>
              <DefinitionList>
                <Definition term="Your Selections">
                  <SavedSearchPillList pills={pills} />
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
};

export default SavedSearchListResultsCard;
