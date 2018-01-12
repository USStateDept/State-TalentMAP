import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import GlossarySearch from './GlossarySearch';
import GlossaryListing from './GlossaryListing';
import Spinner from '../Spinner';
import { GLOSSARY_ARRAY } from '../../Constants/PropTypes';
import { filterByProps } from '../../utilities';

class GlossaryComponent extends Component {
  constructor(props) {
    super(props);
    this.changeText = this.changeText.bind(this);
    this.state = {
      searchText: { value: '' },
    };
  }

  changeText(text) {
    const { searchText } = this.state;
    searchText.value = text;
    this.setState({ searchText });
  }

  filteredGlossary() {
    const { searchText } = this.state;
    const { glossaryItems } = this.props;
    // filter where the keyword matches part of the title or definition
    return filterByProps(searchText.value, ['title', 'definition'], glossaryItems);
  }

  render() {
    const { visible, toggleVisibility, glossaryIsLoading } = this.props;
    const { searchText } = this.state;
    const filteredGlossary = this.filteredGlossary();
    return (
      <div className="tm-glossary">
        <div
          id="glossary"
          className={`glossary ${visible ? 'glossary-visible' : 'glossary-hidden'}`}
          aria-describedby="glossary-title"
          aria-hidden={!visible}
        >
          <button
            title="Close glossary"
            className="glossary-close"
            onClick={toggleVisibility}
          >
            <FontAwesome name="times" />
            <span className="usa-sr-only">Close Glossary</span>
          </button>
          <div className="glossary-content-container">
            <h3 id="glossary-title">Glossary</h3>
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
                <div className="glossary-content">
                  <GlossaryListing glossaryItems={filteredGlossary} />
                </div>
              </div>
            }
          </div>
        </div>
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
