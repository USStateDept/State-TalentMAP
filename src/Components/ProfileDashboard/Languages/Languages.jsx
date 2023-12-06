import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { format, isValid } from 'date-fns-v2';
import { get } from 'lodash';
import shortid from 'shortid';
import SectionTitle from '../SectionTitle';
import InformationDataPoint from '../InformationDataPoint';

const Languages = props => {
  const { languagesArray, useWrapper, showHeader } = props;
  const languagesArray$ = languagesArray || [];

  const getTestDate = (langObj) => {
    const testDate = get(langObj, 'test_date') || '';
    return isValid(new Date(testDate)) ? format(new Date(testDate), 'P') : '--/--/----';
  };

  let content = ( // eslint-disable-line
    <>
      {
        !languagesArray$.length &&
      <div>No language history</div>
      }
      <div className="languages-list-container">
        {languagesArray.map(l => (
          <Fragment key={l.language}>
            {
              get(l, 'language') ?
                <InformationDataPoint
                  key={shortid.generate()}
                  title={get(l, 'language') || 'N/A'}
                  content={
                    <div className="language-details">
                      {`Speaking: ${get(l, 'speaking_score') || '--'} | Reading: ${get(l, 'reading_score') || '--'}`}
                      <span>{`Test Date: ${getTestDate(l)}`}</span>
                    </div>
                  }
                /> : <></>
            }
          </Fragment>
        ))}
      </div>
    </>
  );

  if (useWrapper) {
    content = (
      <div className="usa-grid-full profile-section-container languages-container">
        <div className="usa-grid-full section-padded-inner-container">
          <div className="usa-width-one-whole">
            {showHeader &&
              <SectionTitle title="Language History" len={languagesArray$.length} icon="language" />
            }
          </div>
          {content}
        </div>
      </div>
    );
  } else {
    content = (
      <div className="usa-grid-full">
        {content}
      </div>
    );
  }

  return (
    content
  );
};

Languages.propTypes = {
  languagesArray: PropTypes.arrayOf(
    PropTypes.shape(
      {
        language: PropTypes.string,
        reading_score: PropTypes.string,
        speaking_score: PropTypes.string,
        test_date: PropTypes.string,
      },
    ),
  ),
  useWrapper: PropTypes.bool,
  showHeader: PropTypes.bool,
};

Languages.defaultProps = {
  languagesArray: [],
  useWrapper: true,
  showHeader: true,
};

export default Languages;
