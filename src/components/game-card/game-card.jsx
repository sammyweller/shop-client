import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";




export const GameCard = ( { game, user, token, setUser } ) => {

  const currentUser = user || {};

  const inCart = currentUser.Cart && currentUser.Cart.includes(game.id);

  // Add to cart:
  const handleAddToCart = () => {
    if (currentUser && !currentUser.Cart.includes(game.id)) {
      fetch(`https://cozy-shopper-24251c3233dc.herokuapp.com/users/${currentUser.Username}/games/${game.id}`, {
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



  // Remove from cart
  const handleRemoveFromCart = () => {
    if (currentUser && currentUser.Cart.includes(game.id)) {
      fetch(`https://cozy-shopper-24251c3233dc.herokuapp.com/users/${currentUser.Username}/games/${game.id}`, {
        method: "DELETE",
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
          console.log("Error removing game from cart:", error);
        });
    }
  };




    return (
<Card className="h-100">
      <Card.Img variant="top" src={game.image} />
      <Card.Body>
        <Card.Title>{game.title}</Card.Title>
        <Link to={`/games/${encodeURIComponent(game.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
        {user && (
          <div onClick={inCart ? handleRemoveFromCart : handleAddToCart}>
            {inCart ? <span>remove</span> : <span>add</span>}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

  GameCard.propTypes = {
    game: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    }).isRequired
  };