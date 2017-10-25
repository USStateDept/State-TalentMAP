import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Accordion from '../../Accordion/Accordion';
import AccordionItem from '../../Accordion/AccordionItem/AccordionItem';
import { FILTER_ITEMS_ARRAY, EMPTY_FUNCTION, MISSION_SEARCH_RESULTS } from '../../../Constants/PropTypes';
import AutoSuggest from '../../AutoSuggest';
import RenderSuggestionPost from '../../AutoSuggest/RenderSuggestionPost';
import { ENDPOINT_PARAMS } from '../../../Constants/EndpointParams';

const shortid = require('shortid'); // only use shortid if we don't have a key to use

class MultiSelectFilterContainer extends Component {
  constructor(props) {
    super(props);
    this.onMissionSuggestionSelected = this.onMissionSuggestionSelected.bind(this);
    this.onPostSuggestionSelected = this.onPostSuggestionSelected.bind(this);
  }
  onMissionSuggestionSelected(value) {
    this.props.queryParamToggle(ENDPOINT_PARAMS.mission, value);
  }
  onPostSuggestionSelected(value) {
    this.props.queryParamToggle(ENDPOINT_PARAMS.post, value);
  }
  render() {
    const { multiSelectFilterList, setAccordion, missionSearchIsLoading, missionSearchHasErrored,
      fetchMissionAutocomplete, missionSearchResults, missionExpanded, missionTitle,
      postTitle, postExpanded, fetchPostAutocomplete,
      postSearchResults, postSearchIsLoading, postSearchHasErrored } = this.props;
    return (
      <Accordion>
        {
          multiSelectFilterList.map(item => (
            <AccordionItem
              key={item.title || shortid.generate()}
              id={`checkbox-${item.title}`}
              title={item.title}
              expanded={item.expanded}
              setAccordion={setAccordion}
            >
              {item.content}
            </AccordionItem>))
        }
        <AccordionItem
          key="mission-filter"
          id="mission-filter"
          title={missionTitle}
          expanded={missionExpanded}
          setAccordion={setAccordion}
          liClass="mission-accordion"
        >
          <AutoSuggest
            getSuggestions={fetchMissionAutocomplete}
            suggestions={missionSearchResults}
            placeholder="Start typing a mission"
            onSuggestionSelected={this.onMissionSuggestionSelected}
            queryProperty="id"
          />
          {
            (!missionSearchIsLoading && missionSearchHasErrored) &&
            'An error occured'
          }
        </AccordionItem>
        <AccordionItem
          key="post-filter"
          id="post-filter"
          title={postTitle}
          expanded={postExpanded}
          setAccordion={setAccordion}
          liClass="post-accordion"
        >
          <AutoSuggest
            getSuggestions={fetchPostAutocomplete}
            suggestions={postSearchResults}
            placeholder="Start typing a post"
            onSuggestionSelected={this.onPostSuggestionSelected}
            displayProperty="location"
            queryProperty="id"
            suggestionTemplate={RenderSuggestionPost}
          />
          {
            (!postSearchIsLoading && postSearchHasErrored) &&
            'An error occured'
          }
        </AccordionItem>
      </Accordion>
    );
  }
}

MultiSelectFilterContainer.propTypes = {
  multiSelectFilterList: FILTER_ITEMS_ARRAY.isRequired,
  setAccordion: PropTypes.func,
  fetchMissionAutocomplete: PropTypes.func.isRequired,
  missionSearchResults: MISSION_SEARCH_RESULTS.isRequired,
  missionExpanded: PropTypes.bool.isRequired,
  missionTitle: PropTypes.string.isRequired,
  queryParamToggle: PropTypes.func.isRequired,
  missionSearchIsLoading: PropTypes.bool.isRequired,
  missionSearchHasErrored: PropTypes.bool.isRequired,
  postTitle: PropTypes.string.isRequired,
  postExpanded: PropTypes.bool.isRequired,
  fetchPostAutocomplete: PropTypes.func.isRequired,
  postSearchResults: MISSION_SEARCH_RESULTS.isRequired,
  postSearchIsLoading: PropTypes.bool.isRequired,
  postSearchHasErrored: PropTypes.bool.isRequired,
};

MultiSelectFilterContainer.defaultProps = {
  setAccordion: EMPTY_FUNCTION,
};

export default MultiSelectFilterContainer;
