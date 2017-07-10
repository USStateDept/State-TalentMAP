import React, { Component } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Wrapper from '../../Components/Wrapper/Wrapper';
import { ajax } from '../../utilities';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: { skill__code__in: [], languages__language__code__in: [], grade__code__in: [] },
      items: [
        {
          title: 'Skill code',
          description: 'skill',
          endpoint: 'position/skills',
          selectionRef: 'skill__code__in',
          text: 'Choose skill codes',
          choices: [
          ],
        },
        {
          title: 'Language',
          description: 'language',
          endpoint: 'language',
          selectionRef: 'languages__language__code__in',
          text: 'Choose languages',
          choices: [
          ],
        },
        {
          title: 'Grade',
          description: 'grade',
          endpoint: 'position/grades',
          selectionRef: 'grade__code__in',
          text: 'Choose grades',
          choices: [
          ],
        },
      ],
      proficiency: {},
      qString: null,
      searchText: { value: '' },
    };
  }

  componentWillMount() {
    if (this.props.filters.length) {
      this.props.filters.forEach((f, i) => {
        this.state.items[i].choices = f;
        const items = this.state.items;
        items[i].choices = f;
        this.setState({ items });
      });
    } else {
      this.getFilters();
    }
  }

  getFilters() {
    const api = this.props.api;
    this.state.items.forEach((item, i) => {
      const endpoint = item.endpoint;
      ajax(`${api}/${endpoint}/`)
        .then((res) => {
          const filters = res.data;
          this.state.items[i].choices = filters;
          const items = this.state.items;
          items[i].choices = filters;
          this.setState({ items });
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
      } else {
        copy[key] = copy[key].join();
      }
    });

    const { searchText } = this.state;
    if (searchText.value && searchText.value.length) {
      copy.q = searchText.value;
    }

    qString = queryString.stringify(copy);
    this.setState({ qString });
  }

  changeCheck(ref, e) {
    const { selection } = this.state;
    if (e.target.checked) {
      selection[Object.keys(selection)[ref]].push(e.target.value);
    } else {
      selection[Object.keys(selection)[ref]]
        .splice(selection[Object.keys(selection)[ref]]
          .indexOf(e.target.value), 1);
    }
    this.setState({ selection }, this.createQueryString());
  }

  changeText(e) {
    const { searchText } = this.state;
    searchText.value = e.target.value;
    this.setState({ searchText }, this.createQueryString());
  }

  shouldDisableSearch() {
    const { selection, searchText } = this.state;
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
    if (searchText.value) {
      disabled = false;
    }
    return disabled;
  }

  render() {
    const { items, selection, qString, searchText } = this.state;
    const enableSearch = this.shouldDisableSearch() ? 'hidden' : '';
    const disableSearch = this.shouldDisableSearch() ? '' : 'hidden';
    return (
      <div className="home">
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
                    value={searchText.value}
                    onChange={e => this.changeText(e)}
                    type="search"
                    name="search"
                  />
                  <div id="enabled-search" className={enableSearch}>
                    <Link to={`/results?${qString}`}>
                      <button type="submit">
                        <span className="usa-search-submit-text">Search</span>
                      </button>
                    </Link>
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
                  <div key={`{id}-${choice.code}`}>
                    { items[i].description === 'skill' ?
                      <div key={choice.code} className="usa-width-one-third">
                        <input
                          id={`S${choice.code}`}
                          type="checkbox"
                          title={`${choice.description}`}
                          name="historical-figures-1"
                          value={choice.code}
                          onChange={e => this.changeCheck(i, e)}
                          checked={selection[items[i].selectionRef]
                                    .indexOf(choice.code) !== -1}
                        />
                        <label htmlFor={`S${choice.description}`} style={{ marginRight: '5px' }}>
                          {choice.description}
                        </label>
                      </div>
                    : null
                    }
                    { items[i].description === 'language' ?
                      <div key={choice.code} className="usa-width-one-fourth">
                        <input
                          id={`${choice.code}`}
                          type="checkbox"
                          title={`${choice.short_description}`}
                          name="historical-figures-1"
                          value={choice.code}
                          onChange={e => this.changeCheck(i, e)}
                          checked={selection[items[i].selectionRef]
                                    .indexOf(choice.code) !== -1}
                        />
                        <label htmlFor={`${choice.short_description}`}>
                          {choice.short_description}
                        </label>
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
                      </div>
                    : null
                    }
                    { items[i].description === 'grade' ?
                      <div key={choice.code} className="usa-width-one-fourth">
                        <input
                          id={`G${choice.code}`}
                          type="checkbox"
                          title={`grade-${choice.code}`}
                          name="historical-figures-1"
                          value={choice.code}
                          onChange={e => this.changeCheck(i, e)}
                          checked={selection[items[i].selectionRef]
                                    .indexOf(choice.code) !== -1}
                        />
                        <label htmlFor={`G${choice.code}`}>
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
  filters: PropTypes.arrayOf(
  PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      code: PropTypes.string.isRequired,
      description: PropTypes.string,
      long_description: PropTypes.string,
      short_description: PropTypes.string,
      effective_date: PropTypes.string,
    }),
  ),
),
};

Home.defaultProps = {
  filters: [],
};

export default Home;
