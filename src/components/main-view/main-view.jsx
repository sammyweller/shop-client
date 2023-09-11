import { useState, useEffect } from "react";
import { GameCard } from "../game-card/game-card";
import { GameView } from "../game-view/game-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";



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

  const onLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <BrowserRouter>
          <NavigationBar className="nav-bar" user={user} onLoggedOut={onLogout} />
      <Row className="main-view justify-content-md-center">
        <Routes>

          <Route
            path="/"
            element={
              <>
                {games.map((game) => (
                  <Col
                    className="mb-5 "
                    key={game.id}
                  >
                    <GameCard game={game} />
                  </Col>
                ))}
              </>
            }
          />


          <Route
            path="/games/:gameId"
            element={
              <GameView games={games} />
            }
          />


            <Route
              path="/signup"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={4}>
                      <SignupView />
                    </Col>
                  )}
                </>

              }
            />
            <Route
              path="/login"
              element={
                <>
                  {user ? (
                    <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                        }}
                      />
                    </Col>
                  )}
                </>

              }
            />




        </Routes>
      </Row>
    </BrowserRouter>
  );
};
