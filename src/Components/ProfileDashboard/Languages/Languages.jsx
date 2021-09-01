import PropTypes from 'prop-types';
import { format, isValid } from 'date-fns-v2';
import { get } from 'lodash';
import SectionTitle from '../SectionTitle';
import InformationDataPoint from '../InformationDataPoint';

const Languages = props => {
  const { languagesArray } = props;
  const languagesArray$ = languagesArray || [];

  const getTestDate = (langObj) => {
    const testDate = get(langObj, 'test_date') || '';
    return isValid(new Date(testDate)) ? format(new Date(testDate), 'P') : '--/--/----';
  };

  return (
    <div className="usa-grid-full profile-section-container languages-container">
      <div className="usa-grid-full section-padded-inner-container">
        <div className="usa-width-one-whole">
          <SectionTitle title="Language History" len={languagesArray$.length} icon="language" />
        </div>
        {
          !languagesArray$.length &&
          <div>No language history</div>
        }
        <div className="languages-list-container">
          {languagesArray.map(l => (
            <>
              {
                get(l, 'language') ?
                  <InformationDataPoint
                    title={get(l, 'language') || 'N/A'}
                    content={
                      <div className="language-details">
                        {`Reading: ${get(l, 'reading_score') || '--'} | Speaking: ${get(l, 'speaking_score') || '--'}`}
                        <span>{`Test Date: ${getTestDate(l)}`}</span>
                      </div>
                    }
                  /> : <></>
              }
            </>
          ))}
        </div>
      </div>
    </div>
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
};

Languages.defaultProps = {
  languagesArray: [],
};

export default Languages;
