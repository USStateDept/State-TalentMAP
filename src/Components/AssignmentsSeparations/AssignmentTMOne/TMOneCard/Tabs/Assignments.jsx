import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import FA from 'react-fontawesome';
import { Tooltip } from 'react-tippy';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { Row } from 'Components/Layout';
import InputActions from '../Common/InputActions';

const Assignments = (props) => {
  const { getCableValue, modCableValue, handleDefaultClear, assignments, setAssignments } = props;

  const draggableAssignments = assignments.map((a) => ({
    id: a.NMAS_SEQ_NUM.toString(),
    content:
      <div className="ordered-assignment">
        <span>{a.POS_TITLE_TXT}</span>
        <FA name="fa-regular fa-arrows" />
      </div>,
  }));

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (destination.index === source.index) {
      return;
    }

    const newList = Array.from(assignments);
    const [removed] = newList.splice(source.index, 1);
    newList.splice(destination.index, 0, removed);

    setAssignments(newList);
  };

  return (
    <div className="position-content position-form">
      <div className="mb-20">
        <span className="section-title">Ordered Assignments</span>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {draggableAssignments.map((o, index) => (
                  <Draggable key={o.id} draggableId={o.id} index={index}>
                    {(provided$, snapshot$) => (
                      <div
                        className="ordered-assignment"
                        ref={provided$.innerRef}
                        {...provided$.draggableProps}
                        {...provided$.dragHandleProps}
                        style={{
                          userSelect: 'none',
                          height: snapshot$.isDragging ? '130px' : '',
                          overflowY: snapshot$.isDragging ? 'hidden' : '',
                          ...provided$.draggableProps.style,
                        }}
                      >
                        {o.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="content-divider" />
      <div className="input-container">
        <InputActions
          keys={['ASSIGNMENTS', 'COMBINED TOD']}
          getCableValue={getCableValue}
          handleDefaultClear={handleDefaultClear}
        />
        <Row fluid className="position-content--description">
          <span className="definition-title">Preview Text</span>
          <Tooltip title="Save changes to generate new preview text.">
            <Linkify properties={{ target: '_blank' }}>
              <TextareaAutosize
                maxRows={8}
                minRows={4}
                maxLength="500"
                name="preview-text"
                placeholder="No Description"
                value={getCableValue('ASSIGNMENTS')}
                className="disabled-input"
                draggable={false}
                disabled
              />
            </Linkify>
          </Tooltip>
          <div className="word-count">
            {getCableValue('ASSIGNMENTS')?.length} / 500
          </div>
        </Row>
        <Row fluid className="position-content--description">
          <span className="definition-title">Combined TOD</span>
          <Linkify properties={{ target: '_blank' }}>
            <TextareaAutosize
              maxRows={4}
              minRows={4}
              maxLength="500"
              name="combined-tod"
              placeholder="No Description"
              value={getCableValue('COMBINED TOD')}
              onChange={(e) => modCableValue('COMBINED TOD', e.target.value)}
              draggable={false}
            />
          </Linkify>
          <div className="word-count">
            {getCableValue('COMBINED TOD')?.length} / 500
          </div>
        </Row>
      </div>
    </div>
  );
};

Assignments.propTypes = {
  getCableValue: PropTypes.func.isRequired,
  modCableValue: PropTypes.func.isRequired,
  handleDefaultClear: PropTypes.func.isRequired,
  assignments: PropTypes.arrayOf(PropTypes.shape({})),
  setAssignments: PropTypes.func.isRequired,
};

Assignments.defaultProps = {
  assignments: undefined,
  setAssignments: undefined,
};

export default Assignments;
