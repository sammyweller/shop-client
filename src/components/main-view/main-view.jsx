import { useState, useEffect } from "react";
import { GameCard } from "../game-card/game-card";
import { GameView } from "../game-view/game-view";

export const MainView = () => {
    const [games, setGames] = useState([]);

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


      const [selectedGame, setSelectedGame] = useState(null);

      if (selectedGame) {
        return (
            <GameView game={selectedGame} onBackClick={() => setSelectedGame(null)} />
          );
      }

  if (games.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
    {games.map((game) => (
      <GameCard 
        key={game.id} 
        game={game}
        onGameClick={(newSelectedGame) => {
            setSelectedGame(newSelectedGame);
          }}
         />
    ))}
  </div>
  );
};