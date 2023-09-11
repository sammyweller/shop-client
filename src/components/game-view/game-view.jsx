import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const GameView = ({ games }) => {
  const { gameId } = useParams();



  const game = games.find((g) => g.id === gameId);



  if (!game) {
    return <div>Game not found.</div>;
  }

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
        <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
      </div>
    );
  };