export const GameView = ({ game, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={game.image} alt={game.title}/>
        </div>
        <div>
          <span>Title: </span>
          <span>{game.title}</span>
        </div>
        <div>
          <span>Author: </span>
          <span>{game.author}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };