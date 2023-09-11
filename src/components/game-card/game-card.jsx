import React from "react";

import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";




export const GameCard = ( { game } ) => {
    return (
<Card className="h-100">
      <Card.Img variant="top" src={game.image} />
      <Card.Body>
        <Card.Title>{game.title}</Card.Title>
        <Link to={`/games/${encodeURIComponent(game.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
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