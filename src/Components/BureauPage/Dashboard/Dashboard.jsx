import React from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import { includes } from 'lodash';
// import Picky from 'react-picky';
import ProfileSectionTitle from '../../ProfileSectionTitle';
import Spinner from '../../Spinner';
import SelectForm from '../../SelectForm';
import { Row, Column } from '../../Layout';


const BureauPage = (props) => {
  const {
    placeholderText,
  } = props;

  const bidCycles = [
    { value: null, text: 'Select Cycle' },
    { value: 'Fall 2020', text: 'Fall 2020' },
    { value: 'Winter 2020', text: 'Winter 2020' },
    { value: 'Spring 2021', text: 'Spring 2021' },
    { value: 'Summer 2021', text: 'Summer 2021' },
    { value: 'Fall 2021', text: 'Fall 2021' },
    { value: 'Winter 2021', text: 'Winter 2021' },
  ];

  const countries = [
    'Bahamas', 'Andorra', 'Vanuatu', 'Malawi', 'Equatorial Guinea', 'Sierra Leone', 'Mozambique',
    'France', 'Sudan', 'Iran', 'Malta', 'Papua New Guinea', 'Congo', 'Nauru', 'Guatemala',
    'Wallis and Futuna', 'Madagascar', 'Virgin Islands', 'Saint Pierre and Miquelon', 'Tajikistan',
    'Trinidad and Tobago', 'Iceland', 'Italy', 'Panama', 'Lithuania'];

  return (
    <div
      className={'usa-grid-full profile-content-inner-container bureau-page'}
    >
      {
        !placeholderText &&
          <Spinner type="homepage-position-results" size="big" />
      }
      <div className="usa-grid-full">
        <ProfileSectionTitle title="Bureau Dashboard" icon="tachometer" />
      </div>
      <div className="usa-grid-full">
        <Row className="usa-grid-full">
          <div className="usa-width-one-whole section">
            <h3>Positions Filled</h3>
            {placeholderText}
            <div className="all-inline">
              <SelectForm
                id="bid-cycle"
                options={bidCycles}
                label="Bid Cycle"
              // onSelectOption={myFunction}
              />
            </div>
            <div className="usa-width-one-whole">
              <div className="usa-width-one-fourth">
                <div className="pieContainer">
                  <div className="pieBackground" />
                  <div id="pieSlice1" className="hold">
                    <div className="pie" />
                  </div>
                  <div id="pieSlice2" className="hold">
                    <div className="pie" />
                  </div>
                  <div id="pieSlice3" className="hold">
                    <div className="pie" />
                  </div>
                </div>
                <div className="textCenter">All: 130/150</div>
              </div>
              <div className="usa-width-three-fourths">
                <div className="mainSelector">
                  <FA name={'dot-circle-o'} />
                  <span>WHA (All positions)</span>
                </div>
                {countries.map((m) => {
                  const isSelected = includes(['Nauru', 'Malawi', 'Sudan', 'Guatemala', 'Italy'], m);
                  return (
                    <Column columns={2}>
                      <FA name={isSelected ? 'dot-circle-o' : 'circle-o'} />
                      <span>{m}</span>
                    </Column>
                  );
                })}
              </div>
            </div>
          </div>


          <div className="usa-width-one-whole section">
            <h3>Notifications</h3>
          </div>
        </Row>
      </div>
    </div>
  );
};

BureauPage.propTypes = {
  placeholderText: PropTypes.string,
};

BureauPage.defaultProps = {
  placeholderText: '',
};

export default BureauPage;
