import { getPostName, propOrDefault } from 'utilities';
import { NO_GRADE, NO_POST, NO_SKILL } from 'Constants/SystemMessages';
import { POSITION_DETAILS } from 'Constants/PropTypes';

const FavoriteContent = ({ position }) => (
  <div className="usa-grid-full bid-content-container">
    <div>
      <span className="bid-list-card-title-post">Position title: </span>
      {position.title}
    </div>
    <div>
      <span className="bid-list-card-title-post">Skill: </span>
      {propOrDefault(position, 'skill', NO_SKILL)}
    </div>
    <div>
      <span className="bid-list-card-title-post">Grade: </span>
      {propOrDefault(position, 'grade', NO_GRADE)}
    </div>
    <div>
      <span className="bid-list-card-title-post">Location: </span>
      {getPostName(position.post, NO_POST)}
    </div>
  </div>
);

FavoriteContent.propTypes = {
  position: POSITION_DETAILS.isRequired,
};


export default FavoriteContent;
