import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const GameView = ({ games, user, token, setUser  }) => {
  const { gameId } = useParams();

  const game = games.find((g) => g.id === gameId);


  if (!game) {
    return <div>Game not found.</div>;
  }


  // Add to cart:
  const handleAddToCart = () => {
    if (user && !user.Cart.includes(game.id)) {
      fetch(`https://cozy-shopper-24251c3233dc.herokuapp.com/users/${user.Username}/games/${game.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          setUser(data);
        })
        .catch((error) => {
          console.log("Error adding game to cart:", error);
        });
    }
  };



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
        <button onClick={handleAddToCart}>Add to cart</button>

        <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
      </div>
    );
  };