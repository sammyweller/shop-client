import { useState, useEffect } from "react";
import { GameCard } from "../game-card/game-card";
import { GameView } from "../game-view/game-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';


export const MainView = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);



  useEffect(() => {
    fetch("https://cozy-shopper-24251c3233dc.herokuapp.com/games")
      .then((response) => response.json())
      .then((data) => {
        const gamesFromApi = data.map((game) => ({
          id: game._id,
          title: game.Title,
          description: game.Description,
          price: game.Price,
          image: game.ImgPath
        }));

        setGames(gamesFromApi);
      });
  }, []);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          
          <SignupView />
        </>
      ) : (
        <button onClick={handleLogout}>Logout</button>
      )}

      {selectedGame ? (
        <Col md={8}>
        <GameView game={selectedGame} onBackClick={() => setSelectedGame(null)} />
        </Col>
      ) : (
        games.map((game) => (
          <Col key={game.id} className="mb-5" md={4}>
          <GameCard
            game={game}
            onGameClick={() => {
              setSelectedGame(game);
            }}
          />
          </Col>
        ))
      )}
    </Row>
  );
};
