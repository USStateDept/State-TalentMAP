import React, { Component } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import Wrapper from '../Wrapper/Wrapper';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: { skill: [], language: [], grade: [], q: '' },
      proficiency: {},
      qString: null,
    };
  }

  componentWillMount() {
    let { items } = this.state;
    items = this.props.items;
    this.setState({ items });
  }

  changeProficiency(prof, val) {
    const { proficiency } = this.state;
    proficiency[prof] = val;
    this.setState({ proficiency });
  }

  createQueryString() {
    let { qString } = this.state;
    const copy = Object.assign({}, this.state.selection);
    Object.keys(copy).forEach((key) => {
      if (!copy[key] || !copy[key].length) {
        delete copy[key];
      }
    });
    qString = queryString.stringify(copy);
    this.setState({ qString });
  }

  changeCheck(ref, e) {
    const { selection } = this.state;
    if (e.target.checked) {
      selection[Object.keys(selection)[ref]].push(parseInt(e.target.value, 10));
    } else {
      selection[Object.keys(selection)[ref]]
        .splice(selection[Object.keys(selection)[ref]]
          .indexOf(parseInt(e.target.value, 10)), 1);
    }
    this.setState({ selection });
    this.createQueryString();
  }

  changeText(e) {
    const { selection } = this.state;
    selection.q = e.target.value;
    this.setState({ selection });
    this.createQueryString();
  }

  shouldDisableSearch() {
    const { selection } = this.state;
    let count = 0;
    let disabled = false;
    Object.keys(selection).forEach((key) => {
      if (selection[key].length > 0) {
        count += 1;
      }
    });
    if (count < 2) {
      disabled = true;
    }
    return disabled;
  }

  render() {
    const { items, selection, qString } = this.state;
    const enableSearch = this.shouldDisableSearch() ? 'hidden' : '';
    const disableSearch = this.shouldDisableSearch() ? '' : 'hidden';
    return (
      <div id="main-content" className="Home">
        <br />
        <div className="page-container">
          <div className="usa-grid">
            <div className="usa-width-one-half">
              <div className="usa-search usa-search-big">
                <div role="search">
                  <label className="usa-sr-only" htmlFor="search-field-big">
                      Search big
                  </label>
                  <input
                    id="search-field-big"
                    value={selection.q}
                    onChange={e => this.changeText(e)}
                    type="search"
                    name="search"
                  />
                  <div id="enabled-search" className={enableSearch}>
                    <a href={`/#/results?${qString}`}>
                      <button type="submit">
                        <span className="usa-search-submit-text">Search</span>
                      </button>
                    </a>
                  </div>
                  <div id="disabled-search" className={disableSearch}>
                    <button className="usa-button-disabled" disabled="true" type="submit">
                      <span className="usa-search-submit-text usa-button-disabled">Search</span>
                    </button>
                    <span className="alert-text">Enter at least two search criteria</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="usa-grid">
          <Wrapper>
            <p>Filters:</p>
            <ul className="usa-accordion usa-accordion-bordered">
              {items.map((item, i) => {
                const id = item.id || `item${i}`;
                const checks = item.choices.map(choice => (
                  <div key={choice.code} className="usa-width-one-fourth">
                    <input
                      id={`${i}-${choice.code}`}
                      type="checkbox"
                      title={`${i}-${choice.description}`}
                      name="historical-figures-1"
                      value={choice.code}
                      onChange={e => this.changeCheck(i, e)}
                      checked={selection[items[i].selection_ref]
                                .indexOf(choice.code) !== -1}
                    />
                    <label htmlFor={`${i}-${choice.description}`}>
                      {choice.description}
                    </label>
                    { items[i].selection_ref === 'language' ?
                      <div>
                      Written
                      <div className="button_wrapper">
                        {[1, 2, 3, 4, 5].map(a => (
                          <button
                            key={`${choice.description}-written-${a}`}
                            id={`${choice.description}-written-${a}`}
                            className={this.state.proficiency[`${choice.description}-written`] === a.toString() ? 'usa-button-primary-alt usa-button-active' : 'usa-button-primary-alt'}
                            onClick={() => this.changeProficiency(`${choice.description}-written`, a.toString(), choice.code)}
                          >
                            {a}
                          </button>
                        ),
                        )}
                      </div>
                      Spoken
                      <div className="button_wrapper">
                        {[1, 2, 3, 4, 5].map(a => (
                          <button
                            key={`${choice.description}-spoken-${a}`}
                            id={`${choice.description}-spoken-${a}`}
                            className={this.state.proficiency[`${choice.description}-spoken`] === a.toString() ? 'usa-button-primary-alt usa-button-active' : 'usa-button-primary-alt'}
                            onClick={() => this.changeProficiency(`${choice.description}-spoken`, a.toString(), choice.code)}
                          >
                            {a}
                          </button>
                        ),
                        )}
                      </div>
                        <br />
                      </div>
                    : null }
                  </div>
                ));
                return (
                  <li key={id}>
                    <button
                      className="usa-accordion-button"
                      aria-expanded="false"
                      aria-controls={`accordion ${id}`}
                    >
                      {item.title}
                    </button>
                    <div id={`accordion ${id}`} className="usa-accordion-content">
                      <fieldset className="usa-fieldset-inputs usa-sans">
                        <legend className="usa-sr-only">{item.title}</legend>
                        <div className="usa-grid">
                          {checks}
                        </div>
                      </fieldset>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Wrapper>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      selection_ref: PropTypes.string,
      text: PropTypes.string,
      choices: PropTypes.arrayOf(
        PropTypes.shape({
          code: PropTypes.number,
          description: PropTypes.string,
        }),
      ),
    }),
  ),
};

Home.defaultProps = {
  items: [],
};

export default Home;
