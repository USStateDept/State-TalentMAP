import FontAwesome from 'react-fontawesome';
import EmptyListAlert from '../EmptyListAlert';

const NoFavorites = () => (
  <EmptyListAlert
    textLineOne="You haven't added any favorites."
    textLineTwo={
      (
        <span>
          Collect your favorite job positions by clicking on the &quot;<FontAwesome name="star-o" />
          <span className="sr-only">star icon</span> Add to Favorites&quot; button while you search.
        </span>
      )
    }
  />
);

export default NoFavorites;
