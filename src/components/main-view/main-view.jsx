import { useState, useEffect } from "react";
import { GameCard } from "../game-card/game-card";
import { GameView } from "../game-view/game-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

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
    <div>
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
        <GameView game={selectedGame} onBackClick={() => setSelectedGame(null)} />
      ) : (
        games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            onGameClick={() => {
              setSelectedGame(game);
            }}
          />
        ))
      )}
    </div>
  );
};
