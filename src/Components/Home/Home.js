import React, { Component } from 'react';
import queryString from 'query-string';
import Wrapper from '../Wrapper/Wrapper';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { title: 'Skill Code', selection_ref: 'skill', text: 'Choose skill codes', choices: [{ code: 1, description: 'accounting' }, { code: 2, description: 'economics' }, { code: 3, description: 'information technology' }] },
        { title: 'Language', selection_ref: 'language', text: 'Choose language', choices: [{ code: 1, description: 'English' }, { code: 2, description: 'Spanish' }, { code: 3, description: 'French' }] },
        { title: 'Grade', selection_ref: 'grade', text: 'Choose grades', choices: [{ code: 1, description: '1' }, { code: 2, description: '2' }, { code: 3, description: '3' }] },
      ],
      selection: { skill: [], language: [], grade: [], q: '' },
      qString: null,
    };
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
      <div id="main-content" className="Home">
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

export default Home;
