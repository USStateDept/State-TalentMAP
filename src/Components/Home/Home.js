import React, { Component } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import axios from 'axios';
import Wrapper from '../Wrapper/Wrapper';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: { skill: [], language: [], grade: [], q: '' },
      items: [
        {
          title: 'Skill code',
          endpoint: 'position/skills',
          selectionRef: 'skill',
          text: 'Choose skill codes',
          choices: [
          ],
        },
        {
          title: 'Language',
          endpoint: 'language',
          selectionRef: 'language',
          text: 'Choose languages',
          choices: [
          ],
        },
        {
          title: 'Grade',
          endpoint: 'position/grades',
          selectionRef: 'grade',
          text: 'Choose grades',
          choices: [
          ],
        },
      ],
      proficiency: {},
      qString: null,
    };
  }

  componentWillMount() {
  }

  componentDidMount() {
    this.getFilters(); // eslint-disable-line react/prop-types
  }

  getFilters() {
    const api = this.props.api;
    this.state.items.forEach((item, i) => {
      const endpoint = item.endpoint;
      axios.get(`${api}/${endpoint}`)
        .then((res) => {
          const filters = res.data;
          console.log(res.data);
          this.state.items[i].choices = filters;
          console.log(this.state.items);
          const items = this.state.items;
          items[i].choices = filters;

          // update state
          this.setState({
            items,
          });
        });
    });
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
      <div id="main-content" className="home">
        <br />
        <div className="page-container">
          <div className="usa-grid">
            <div className="usa-width-one-half">
              <div className="usa-search usa-search-big">
                <div role="search">
                  <label className="usa-sr-only" htmlFor="search-field">
                      Search
                  </label>
                  <input
                    id="search-field"
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
                    <span className="alert-text">Select from at least two search filters</span>
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
                  <div>
                    { items[i].selectionRef === 'skill' ?
                      <div key={choice.code} className="usa-width-one-fourth">
                        <input
                          id={`${i}-${choice.code}`}
                          type="checkbox"
                          title={`${i}-${choice.description}`}
                          name="historical-figures-1"
                          value={choice.code}
                          onChange={e => this.changeCheck(i, e)}
                          checked={selection[items[i].selectionRef]
                                    .indexOf(choice.code) !== -1}
                        />
                        <label htmlFor={`${i}-${choice.description}`}>
                          {choice.description}
                        </label>
                      </div>
                    : null
                    }
                    { items[i].selectionRef === 'language' ?
                      <div key={choice.code} className="usa-width-one-fourth">
                        <input
                          id={`${i}-${choice.code}`}
                          type="checkbox"
                          title={`${i}-${choice.short_description}`}
                          name="historical-figures-1"
                          value={choice.code}
                          onChange={e => this.changeCheck(i, e)}
                          checked={selection[items[i].selectionRef]
                                    .indexOf(choice.code) !== -1}
                        />
                        <label htmlFor={`${i}-${choice.short_description}`}>
                          {choice.short_description}
                        </label>
                        { items[i].selectionRef === 'language' ?
                          <div>
                          Written
                          <div className="button_wrapper">
                            {[1, 2, 3, 4, 5].map(a => (
                              <button
                                key={`${choice.short_description}-written-${a}`}
                                id={`${choice.short_description}-written-${a}`}
                                className={this.state.proficiency[`${choice.short_description}-written`] === a.toString() ? 'usa-button-primary-alt usa-button-active' : 'usa-button-primary-alt'}
                                onClick={() => this.changeProficiency(`${choice.short_description}-written`, a.toString(), choice.code)}
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
                                key={`${choice.short_description}-spoken-${a}`}
                                id={`${choice.short_description}-spoken-${a}`}
                                className={this.state.proficiency[`${choice.short_description}-spoken`] === a.toString() ? 'usa-button-primary-alt usa-button-active' : 'usa-button-primary-alt'}
                                onClick={() => this.changeProficiency(`${choice.short_description}-spoken`, a.toString(), choice.code)}
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
                    : null
                    }
                    { items[i].selectionRef === 'grade' ?
                      <div key={choice.code} className="usa-width-one-fourth">
                        <input
                          id={`${i}-${choice.code}`}
                          type="checkbox"
                          title={`${i}-${choice.code}`}
                          name="historical-figures-1"
                          value={choice.code}
                          onChange={e => this.changeCheck(i, e)}
                          checked={selection[items[i].selectionRef]
                                    .indexOf(choice.code) !== -1}
                        />
                        <label htmlFor={`${i}-${choice.code}`}>
                          {choice.code}
                        </label>
                      </div>
                    : null
                    }
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
  api: PropTypes.string.isRequired,
};

Home.defaultProps = {
};

export default Home;
