import { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import Fuse from 'fuse.js';
import { isEqual } from 'lodash';
import GlossarySearch from './GlossarySearch';
import GlossaryListing from './GlossaryListing';
import Spinner from '../Spinner';
import BoxShadow from '../BoxShadow';
import { GLOSSARY_ARRAY } from '../../Constants/PropTypes';
import GlossaryExport from './GlossaryExport';

const ID = 'glossary-click-container';
const BYPASS_CLASS = 'bypass-glossary';

const fuseOptions = {
  shouldSort: false,
  findAllMatches: true,
  tokenize: true,
  includeScore: false,
  threshold: 0.25,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'title', 'definition', 'link',
  ],
};

class GlossaryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: { value: '' },
    };
    this.fuse = new Fuse([], fuseOptions);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // The listener only needs to exist if the Glossary is visible.
    if (nextProps.visible) {
      this.resetText();
      /* This needs to be in a timeout, otherwise the glossary will immediately
      close the first time it is opened, since the Glossary link is "outside"
      of the Glossary div, and that click event will have been registered. */
      setTimeout(() => {
        window.addEventListener('click', this.handleOutsideClick);
      }, 0);
    } else { // If the Glossary is not visible, remove the event listener.
      window.removeEventListener('click', this.handleOutsideClick);
    }

    // re-instantiate the search index if glossaryItems changes
    if (!isEqual(this.props.glossaryItems, nextProps.glossaryItems)) {
      this.fuse = new Fuse(nextProps.glossaryItems, fuseOptions);
    }
  }


  resetText = () => {
    this.changeText('');
  }

  toggleVisibility = () => {
    this.props.toggleVisibility();
  }

  handleOutsideClick = e => {
    const { visible } = this.props;
    if (visible && !document.getElementById(ID).contains(e.target)
      && (e.target.id !== BYPASS_CLASS)) {
      this.toggleVisibility();
    }
  };

  changeText = text => {
    const { searchText } = this.state;
    searchText.value = text;
    this.setState({ searchText });
  };

  filteredGlossary() {
    const { searchText } = this.state;
    const { glossaryItems } = this.props;
    // filter where the keyword matches part of the title, definition, or link
    if (searchText.value) {
      return this.fuse.search(searchText.value).map(({ item }) => item);
    }
    return glossaryItems;
  }

  render() {
    const { visible, glossaryIsLoading } = this.props;
    const { searchText } = this.state;
    const filteredGlossary = this.filteredGlossary();
    return (
      <div id={ID} className="tm-glossary">
        <BoxShadow
          offsetX={-4}
          offsetY={0}
          blurRadius={4}
          spreadRadius={0}
          id="glossary"
          className={`glossary ${visible ? 'glossary-visible' : 'glossary-hidden'}`}
          aria-describedby="glossary-title"
          aria-hidden={!visible}
        >
          <button
            title="Close glossary"
            className="glossary-close"
            onClick={this.toggleVisibility}
          >
            <FontAwesome name="times" />
            <span className="usa-sr-only">Close Glossary</span>
          </button>
          <div className="glossary-content-container">
            <div className="glossary-top glossary-padding">
              <h3 id="glossary-title">Glossary</h3>
            </div>
            {
              glossaryIsLoading &&
                <Spinner type="glossary tm-spinner-color-inverted" size="big" />
            }
            {
              !glossaryIsLoading &&
              <div>
                <GlossarySearch
                  changeText={this.changeText}
                  searchTextValue={searchText.value}
                />
                <GlossaryExport />
                <div className="glossary-content">
                  <GlossaryListing glossaryItems={filteredGlossary} />
                </div>
              </div>
            }
          </div>
        </BoxShadow>
      </div>
    );
  }
}

GlossaryComponent.propTypes = {
  visible: PropTypes.bool,
  toggleVisibility: PropTypes.func.isRequired,
  glossaryItems: GLOSSARY_ARRAY.isRequired,
  glossaryIsLoading: PropTypes.bool,
};

GlossaryComponent.defaultProps = {
  visible: false,
  glossaryIsLoading: false,
};

export default GlossaryComponent;
