export const GameCard = ( { game, onGameClick } ) => {
    return (
        <div
          onClick={() => {
            onGameClick(game);
          }}
        >
          {game.title}
        </div>
      );
  };