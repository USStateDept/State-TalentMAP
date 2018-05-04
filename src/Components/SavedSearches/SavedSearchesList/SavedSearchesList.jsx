import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ScrollArea from 'react-scrollbar/dist/no-css';
import { merge } from 'lodash';
import SavedSearchesListResultsCard from '../SavedSearchesListResultsCard';
import { SAVED_SEARCH_PARENT_OBJECT, MAPPED_PARAM_ARRAY } from '../../../Constants/PropTypes';
import NoSavedSearches from '../../EmptyListAlert/NoSavedSearches';

class SavedSearchesList extends Component {
  constructor(props) {
    super(props);
    this.updateScroll = this.updateScroll.bind(this);
    this.setScrollRef = this.setScrollRef.bind(this);
    this.setContainerRef = this.setContainerRef.bind(this);
    this.state = {
      container$: null,
      scroll$: null,
      scroll: {
        horizontal: false,
        focusableTabIndex: 0,
        smoothScrolling: true,
        stopScrollPropagation: true,
        minScrollSize: 20,
        style: {},
      },
    };

    this.scroll$ = null;
  }

  componentDidMount() {
    this.updateScroll();
    window.addEventListener('resize', this.updateScroll);

    setTimeout(() => {
      if (this.scroll$) {
        // Force scrollbar to render
        this.scroll$.handleWindowResize();
      }
    });
  }

  componentWillUnmount() {
    window.addEventListener('resize', null);
  }

  setContainerRef(el) {
    this.container$ = el;
  }

  setScrollRef(el) {
    this.scroll$ = el;
  }

  updateScroll() {
    const scroll = merge({}, this.state.scroll);
    const header = document.getElementById('header');
    const list = this.container$;

    if (header && list) {
      scroll.style.height = (window.innerHeight - header.offsetHeight - 110);
      this.setState({ scroll });
    }
  }

  render() {
    const savedSearchArray = [];
    const {
      savedSearches,
      goToSavedSearch,
      deleteSearch,
      cloneSavedSearch,
      mappedParams,
    } = this.props;

    savedSearches.results.slice().forEach(savedSearch => (
      savedSearchArray.push(
        <SavedSearchesListResultsCard
          savedSearch={savedSearch}
          goToSavedSearch={goToSavedSearch}
          deleteSearch={deleteSearch}
          key={savedSearch.id}
          cloneSavedSearch={cloneSavedSearch}
          mappedParams={mappedParams}
          /* pass a parentClassName that we can use from the BorderedList component */
          parentClassName="parent-list-container list-transparent"
        />,
      )
    ));

    let emptyListClass = 'saved-searches-list-empty';
    if (savedSearchArray.length) { emptyListClass = ''; }

    return (
      <div className="usa-grid-full" ref={this.setContainerRef}>
        {
          !!savedSearchArray.length &&
          <ScrollArea {...this.state.scroll} ref={this.setScrollRef}>
            <div className={`usa-grid-full saved-searches-list ${emptyListClass}`}>
              {savedSearchArray.map(s => s)}
            </div>
          </ScrollArea>
        }
        { !savedSearchArray.length && <NoSavedSearches /> }
      </div>
    );
  }
}

SavedSearchesList.propTypes = {
  savedSearches: SAVED_SEARCH_PARENT_OBJECT.isRequired,
  goToSavedSearch: PropTypes.func.isRequired,
  deleteSearch: PropTypes.func.isRequired,
  cloneSavedSearch: PropTypes.func.isRequired,
  mappedParams: MAPPED_PARAM_ARRAY.isRequired,
};

SavedSearchesList.defaultProps = {
  mappedParams: [],
};

export default SavedSearchesList;
