import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";


export const GameCard = ( { game, onGameClick } ) => {
    return (
<Card className="h-100">
      <Card.Img variant="top" src={game.image} />
      <Card.Body>
        <Card.Title>{game.title}</Card.Title>
        <Button onClick={() => onGameClick(game)} variant="link">
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};

  GameCard.propTypes = {
    game: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    }).isRequired,
    onGameClick: PropTypes.func.isRequired
  };