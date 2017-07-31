import React, { Component } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import Wrapper from '../Wrapper/Wrapper';
import { EMPTY_FUNCTION, ITEMS } from '../../Constants/PropTypes';

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: {
        skill__code__in: [],
        languages__language__code__in: [],
        grade__code__in: [],
        post__tour_of_duty__in: [],
        organization__code__in: [],
        post__cost_of_living_adjustment__gt: [],
        post__differential_rate__gt: [],
        post__danger_pay__gt: [],
        domestic: [],
      },
      proficiency: {},
      qString: null,
      searchText: { value: '' },
    };
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

  submitSearch(e) {
    e.preventDefault();
    this.props.onSubmit(`/results?${this.state.qString}`);
  }

  render() {
    const { selection, searchText } = this.state;
    const { items } = this.props;
    if (items.length) { items.sort((a, b) => a.item.sort - b.item.sort); }
    const filters = (
      <div className="usa-grid">
        <Wrapper>
          <p>Filters:</p>
          <ul className="usa-accordion usa-accordion-bordered">
            {items.map((item, i) => {
              const id = `item${i}`;
              const checks = item.data.map(choice => (
                <div key={`{id}-${choice.code}`}>
                  { items[i].item.description === 'skill' ?
                    <div key={choice.code} className="usa-width-one-third">
                      <input
                        id={`S${choice.code}`}
                        type="checkbox"
                        title={`${choice.description}`}
                        name={`S${choice.code}`}
                        value={choice.code}
                        onChange={e => this.changeCheck(i, e)}
                        checked={selection[items[i].item.selectionRef]
                                  .indexOf(choice.code) !== -1}
                      />
                      <label htmlFor={`S${choice.code}`} style={{ marginRight: '5px' }}>
                        {choice.description}
                      </label>
                    </div>
                  : null
                  }
                  { items[i].item.description === 'language' ?
                    <div key={choice.code} className="usa-width-one-fourth">
                      <input
                        id={`L${choice.code}`}
                        type="checkbox"
                        title={`${choice.short_description}`}
                        name={`L${choice.code}`}
                        value={choice.code}
                        onChange={e => this.changeCheck(i, e)}
                        checked={selection[items[i].item.selectionRef]
                                  .indexOf(choice.code) !== -1}
                      />
                      <label htmlFor={`L${choice.code}`}>
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
                  { items[i].item.description === 'grade' ?
                    <div key={choice.code} className="usa-width-one-fourth">
                      <input
                        id={`G${choice.code}`}
                        type="checkbox"
                        title={`grade-${choice.code}`}
                        name={`G${choice.code}`}
                        value={choice.code}
                        onChange={e => this.changeCheck(i, e)}
                        checked={selection[items[i].item.selectionRef]
                                  .indexOf(choice.code) !== -1}
                      />
                      <label htmlFor={`G${choice.code}`}>
                        {choice.code}
                      </label>
                    </div>
                  : null
                  }
                  { items[i].item.description === 'tod' ?
                    <div key={choice.code} className="usa-width-one-fourth">
                      <input
                        id={`TOD${choice.code}`}
                        type="checkbox"
                        title={`tod-${choice.code}`}
                        name={`TOD${choice.code}`}
                        value={choice.id}
                        onChange={e => this.changeCheck(i, e)}
                        checked={selection[items[i].item.selectionRef]
                                  .indexOf(choice.id.toString()) !== -1}
                      />
                      <label htmlFor={`TOD${choice.code}`}>
                        {choice.long_description}
                      </label>
                    </div>
                  : null
                  }
                  { items[i].item.description === 'region' ?
                    <div key={choice.code} className="usa-width-one-fourth">
                      <input
                        id={`R${choice.code}`}
                        type="checkbox"
                        title={`region-${choice.code}`}
                        name={`R${choice.code}`}
                        value={choice.code}
                        onChange={e => this.changeCheck(i, e)}
                        checked={selection[items[i].item.selectionRef]
                                  .indexOf(choice.code) !== -1}
                      />
                      <label htmlFor={`R${choice.code}`}>
                        {choice.long_description}
                      </label>
                    </div>
                  : null
                  }
                  { items[i].item.bool ?
                    <div key={choice.code} className="usa-width-one-fourth">
                      <input
                        id={items[i].item.description}
                        type="checkbox"
                        title={items[i].item.description}
                        name={items[i].item.description}
                        value={choice.code}
                        onChange={e => this.changeCheck(i, e)}
                        checked={selection[items[i].item.selectionRef]
                                  .indexOf(choice.code) !== -1}
                      />
                      <label htmlFor={items[i].item.description}>
                        {choice.short_description}
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
                    {item.item.title}
                  </button>
                  <div id={`accordion ${id}`} className="usa-accordion-content">
                    <fieldset className="usa-fieldset-inputs usa-sans">
                      <legend className="usa-sr-only">{item.item.title}</legend>
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
    );
    return (
      <div className="home">
        <br />
        <div className="page-container">
          <div className="usa-grid">
            <div className="usa-width-one-half">
              <div className="usa-search usa-search-big">
                <div role="search">
                  <form onSubmit={e => this.submitSearch(e)}>
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
                    <div id="enabled-search">
                      <button
                        className={this.shouldDisableSearch() ? 'usa-button-disabled' : null}
                        disabled={this.shouldDisableSearch()}
                        type="submit"
                      >
                        <span className="usa-search-submit-text">Search</span>
                      </button>
                    </div>
                    <div id="disabled-search" className={'hidden'}>
                      <button className="usa-button-disabled" disabled="true" type="submit">
                        <span className="usa-search-submit-text usa-button-disabled">Search</span>
                      </button>
                      <span className="alert-text">Select from at least two search filters</span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        {filters}
      </div>
    );
  }
}

Filters.propTypes = {
  onSubmit: PropTypes.func,
  items: ITEMS,
};

Filters.defaultProps = {
  items: [],
  onSubmit: EMPTY_FUNCTION,
};

export default (Filters);
