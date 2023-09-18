import { useEffect, useState } from 'react';
import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import PropTypes from 'prop-types';
import { EMPTY_FUNCTION, POSITION_DETAILS } from 'Constants/PropTypes';
import { formatDateFromStr } from 'utilities';
import { DEFAULT_TEXT } from 'Constants/SystemMessages';
import { Row } from 'Components/Layout';
import TabbedCard from 'Components/TabbedCard';
import PositionExpandableContent from 'Components/PositionExpandableContent';

const PublishablePositionCard = ({ data, onEditModeSearch, onSubmit, disableEdit }) => {
  // =============== Overview: View Mode ===============

  const sections = {
    /* eslint-disable quote-props */
    subheading: [
      { 'Position Number': data?.positionNumber || DEFAULT_TEXT },
      { 'Skill': data?.skill || DEFAULT_TEXT },
      { 'Position Title': data?.positionTitle || DEFAULT_TEXT },
    ],
    bodyPrimary: [
      { 'Bureau': data?.bureau || DEFAULT_TEXT },
      { 'Organization': data?.org || DEFAULT_TEXT },
      { 'Grade': data?.grade || DEFAULT_TEXT },
      { 'Status': data?.status || DEFAULT_TEXT },
      { 'Language': data?.language || DEFAULT_TEXT },
      { 'Pay Plan': data?.payPlan || DEFAULT_TEXT },
    ],
    bodySecondary: [
      // { 'Bid Cycle': data?.status || DEFAULT_TEXT },
      // { 'TED': data?.status || DEFAULT_TEXT },
      // { 'Incumbent': data?.status || DEFAULT_TEXT },
      // { 'Tour of Duty': data?.status || DEFAULT_TEXT },
      // { 'Assignee': data?.status || DEFAULT_TEXT },
      // { 'Post Differential | Danger Pay': data?.status || DEFAULT_TEXT },
    ],
    textarea: data?.positionDetails || 'No description.',
    metadata: [
      { 'Last Updated': formatDateFromStr(data?.lastUpdated) },
    ],
    /* eslint-enable quote-props */
  };


  // =============== Overview: Edit Mode ===============

  const [textArea, setTextArea] = useState(data?.positionDetails || 'No description.');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    onEditModeSearch(editMode);
  }, [editMode]);

  const onSubmitForm = () => {
    const editData = {
      posSeqNum: data?.posSeqNum,
      positionDetails: textArea,
      lastUpdatedUserID: data?.lastUpdatedUserID,
      lastUpdated: data?.lastUpdated,
    };
    onSubmit(editData);
  };

  const onCancelForm = () => {
    // this is likely not going to be needed, as we should be
    // re-reading from "pos" when we open Edit Form back up
    // clear will need to set states back to the pull
    // from "pos" once we've determined the ref data structure
    setEditMode(false);
  };
  const form = {
    /* eslint-disable quote-props */
    staticBody: [
      { 'Bureau': data?.bureau || DEFAULT_TEXT },
      { 'Organization': data?.org || DEFAULT_TEXT },
      { 'Grade': data?.grade || DEFAULT_TEXT },
      { 'Status': data?.status || DEFAULT_TEXT },
      { 'Language': data?.language || DEFAULT_TEXT },
      { 'Pay Plan': data?.payPlan || DEFAULT_TEXT },
    ],
    inputBody: (
      <div className="position-form">
        <div>
          <Row fluid className="position-form--description">
            <span className="definition-title">Position Details</span>
            <Linkify properties={{ target: '_blank' }}>
              <TextareaAutosize
                maxRows={6}
                minRows={6}
                maxlength="4000"
                name="position-description"
                placeholder="No Description"
                defaultValue={textArea}
                onChange={(e) => setTextArea(e.target.value)}
                draggable={false}
              />
            </Linkify>
            <div className="word-count">
              {textArea.length} / 4,000
            </div>
          </Row>
        </div>
      </div>
    ),
    handleSubmit: onSubmitForm,
    handleCancel: onCancelForm,
    handleEdit: {
      editMode,
      setEditMode,
      disableEdit,
    },
    /* eslint-enable quote-props */
  };

  // =============== Classification ===============

  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    if (data.position) {
      setFormData(data.position?.classifications);
    }
  }, [data]);

  return (
    <TabbedCard
      tabs={[{
        text: 'Position Overview',
        value: 'OVERVIEW',
        content: <PositionExpandableContent
          sections={sections}
          form={form}
        />,
      }]}
    />
  );
};

PublishablePositionCard.propTypes = {
  data: POSITION_DETAILS.isRequired,
  onEditModeSearch: PropTypes.func,
  onSubmit: PropTypes.func,
  disableEdit: PropTypes.bool,
};

PublishablePositionCard.defaultProps = {
  onEditModeSearch: EMPTY_FUNCTION,
  onSubmit: EMPTY_FUNCTION,
  disableEdit: false,
};

export default PublishablePositionCard;
