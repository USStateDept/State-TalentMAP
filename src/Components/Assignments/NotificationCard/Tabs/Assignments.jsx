import { useState } from 'react';
import Linkify from 'react-linkify';
import TextareaAutosize from 'react-textarea-autosize';
import FA from 'react-fontawesome';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Row } from 'Components/Layout';
import InputActions from '../Common/InputActions';

const orderedAssignments = [{
  id: 1,
  value: 'EF LM/OPS/TMP (123456/D1234567) Contract Assistant',
}, {
  id: 2,
  value: 'EF LM/OPS/TMP (123456/D1234567) Contract Assistant',
}, {
  id: 3,
  value: 'EF LM/OPS/TMP (123456/D1234567) Contract Assistant',
}];

const Assignments = () => {
  const [previewText, setPreviewText] = useState('');
  const [combinedTod, setCombinedTod] = useState('');

  // Have to get the assignments array into correct format for DnD
  const orderedAssignmentsDnd = orderedAssignments.map((a) => ({
    id: `item-${a.id}`,
    content:
      <div className="ordered-assignment">
        <span>{a.value}</span>
        <FA name="fa-regular fa-arrows" />
      </div>,
  }));

  // TODO: create a state 'ordered array' of assignments to send to BE
  // which will be updated in this function (probably going to be a LOT of code)
  // see PositionManagerBidders for reference
  const onDragEnd = result => {
    // eslint-disable-next-line no-unused-vars
    const { destination } = result;
    // dropped outside the list
    // if (!destination) {
    // }
  };

  const getListStyle = () => ({
    maxHeight: 1000,
    overflowY: 'scroll',
  });

  const getItemStyle = (isDragging, draggableStyle) => {
    const height = isDragging ? '130px' : '';
    const overflowY = isDragging ? 'hidden' : '';
    return {
    // some basic styles to make the items look a bit nicer
      userSelect: 'none',

      height,
      overflowY,

      // styles we need to apply on draggables
      ...draggableStyle,
    };
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
                style={getListStyle()}
              >
                {orderedAssignmentsDnd.map((o, index) => (
                  <Draggable key={o.id} draggableId={o.id} index={index}>
                    {(provided$, snapshot$) => (
                      <div
                        className="ordered-assignment"
                        ref={provided$.innerRef}
                        {...provided$.draggableProps}
                        {...provided$.dragHandleProps}
                        style={getItemStyle(
                          snapshot$.isDragging,
                          provided$.draggableProps.style,
                        )}
                      >
                        {o.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )
            }
          </Droppable>
        </DragDropContext>
      </div>
      <div className="content-divider" />
      <div className="input-container">
        <InputActions />
        <Row fluid className="position-content--description">
          <span className="definition-title">Preview Text</span>
          <Linkify properties={{ target: '_blank' }}>
            <TextareaAutosize
              maxRows={4}
              minRows={4}
              maxlength="500"
              name="preview-text"
              placeholder="No Description"
              defaultValue={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
              className="enabled-input"
              draggable={false}
            />
          </Linkify>
          <div className="word-count">
            {previewText?.length} / 500
          </div>
        </Row>
        <Row fluid className="position-content--description">
          <span className="definition-title">Combined TOD</span>
          <Linkify properties={{ target: '_blank' }}>
            <TextareaAutosize
              maxRows={4}
              minRows={4}
              maxlength="500"
              name="combined-tod"
              placeholder="No Description"
              defaultValue={combinedTod}
              onChange={(e) => setCombinedTod(e.target.value)}
              className="enabled-input"
              draggable={false}
            />
          </Linkify>
          <div className="word-count">
            {combinedTod?.length} / 500
          </div>
        </Row>
        <div className="position-form--actions">
          <button onClick={() => { }}>Back</button>
          <button onClick={() => { }}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Assignments;
