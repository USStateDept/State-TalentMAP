import React from 'react';
import PropTypes from 'prop-types';
import FA from 'react-fontawesome';
import ProfileSectionTitle from '../ProfileSectionTitle';
import Spinner from '../Spinner';
import { Row, Column } from '../Layout';
import ExportButton from '../ExportButton';
import { EMPTY_FUNCTION } from '../../Constants/PropTypes';

const AdministratorPage = (props) => {
  const {
    isLoading,
    logsIsLoading,
    onDownloadClick,
  } = props;

  return (
    <div
      className={`usa-grid-full profile-content-inner-container administrator-page
      ${(isLoading) ? 'results-loading' : ''}`}
    >
      {
        isLoading &&
          <Spinner type="homepage-position-results" size="big" />
      }
      <div className="usa-grid-full">
        <ProfileSectionTitle title="Administrator Dashboard" icon="sitemap" />
      </div>
      <div className="usa-grid-full">
        <Row className="usa-grid-full">
          <Column
            columns={3}
          >
            <div className="usa-width-one-whole section">
              <h3>TalentMAP Data Sync</h3>
              <div className="export-button-container">
                <ExportButton
                  onClick={onDownloadClick}
                  isLoading={logsIsLoading}
                  primaryClass="usa-button-primary"
                  text={<span>Download Logs <FA name="download" /></span>}
                />
              </div>
            </div>
          </Column>
        </Row>
      </div>
    </div>
  );
};

AdministratorPage.propTypes = {
  isLoading: PropTypes.bool,
  logsIsLoading: PropTypes.bool,
  onDownloadClick: PropTypes.func,
};

AdministratorPage.defaultProps = {
  isLoading: false,
  logsIsLoading: false,
  onDownloadClick: EMPTY_FUNCTION,
};

export default AdministratorPage;
