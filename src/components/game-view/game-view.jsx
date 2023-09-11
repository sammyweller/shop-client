export const GameView = ({ game, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={game.image} alt={game.title}/>
        </div>
        <div>
          <span>{game.title}</span>
        </div>
        <div>
          <span>{game.description}</span>
        </div>
        <div>
          <span>Price: </span>
          <span>{game.price}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };