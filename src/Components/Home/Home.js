import React, { Component } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import Wrapper from '../Wrapper/Wrapper';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selection: { skill: [], language: [], grade: [], q: '' },
      qString: null,
    };
  }

  componentWillMount() {
    let { items } = this.state;
    items = this.props.items;
    this.setState({ items });
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

  render() {
    const { items, selection, qString } = this.state;
    return (
      <div id="main-content" className="home">
        <Wrapper>
          <ul className="usa-accordion usa-accordion-bordered">
            {items.map((item, i) => {
              const id = item.id || `item${i}`;
              const checks = item.choices.map(choice => (
                <li key={choice.code}>
                  <input
                    id={`${i}-${choice.code}`}
                    type="checkbox"
                    name="historical-figures-1"
                    value={choice.code}
                    onChange={e => this.changeCheck(i, e)}
                    checked={selection[items[i].selection_ref]
                                          .indexOf(choice.code) !== -1}
                  />
                  <label htmlFor={`${choice.code}-${choice.description}`}>
                    {choice.description}
                  </label>
                </li>
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
                    {JSON.stringify(selection)}
                    <fieldset className="usa-fieldset-inputs usa-sans">
                      <legend className="usa-sr-only">{item.title}</legend>
                      <ul className="usa-unstyled-list">
                        {checks}
                      </ul>
                    </fieldset>
                  </div>
                </li>
              );
            })}
          </ul>
        </Wrapper>
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
                  <a href={`/#/results?${qString}`}>
                    <button type="submit">
                      <span className="usa-search-submit-text">Search</span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
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
