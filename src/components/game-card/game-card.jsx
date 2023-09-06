import PropTypes from "prop-types";


export const GameCard = ( { game, onGameClick } ) => {
    return (
        <div
          onClick={() => {
            onGameClick(game);
          }}
        >
          {game.title}
          {game.image}
        </div>
      );
  };


  GameCard.propTypes = {
    game: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    }).isRequired,
    onGameClick: PropTypes.func.isRequired
  };