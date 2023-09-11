import { useState, useEffect } from "react";
import { GameCard } from "../game-card/game-card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";


export const ProfileView = ({ user, games, token, onLogout }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const cart = games.filter((g) => user.Cart.includes(g.id));


  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);


  const handleUpdateUser = (event) => {
    event.preventDefault();

    // Create an updatedUser object with new values
    const updatedUser = {
      username,
      password,
      email
    };

    // Make an API request to update the user's information
    fetch(`https://cozy-shopper-24251c3233dc.herokuapp.com/users/${user.username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedUser)
    })
      .then((response) => response.json())
      .then((data) => {
        setSuccessMessage("User updated successfully");
      })
      .catch((error) => {
        console.log("Error updating user data:", error);
      });
  };


  const handleDeleteUser = () => {
    // Make an API request to delete the user's account
    fetch(`https://cozy-shopper-24251c3233dc.herokuapp.com/users/${user.username}`, {
      method: "DELETE",
      headers: {
          Authorization: `Bearer ${token}`
      }
  }).then((response) => {
      if (response.ok) {
          onLogout();
      } else {
          alert("something went wrong.")
      }
  })
}

  return (
    <div className="center-container"  >
      <h2 className="userinfo-title">@{username}'s user info:</h2>
      <Form onSubmit={handleUpdateUser} >
        <Form.Group controlId="formUsername" >
          <Form.Label >Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword" >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail" >
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit"  className="update-button" >Update</Button>
      </Form>
      {successMessage && <p>{successMessage}</p>}


      <Button variant="danger" className="delete-button" onClick={handleDeleteUser}>
        Delete Account
      </Button>


      <h2>@{username}'s cart:</h2>
      
      {cart.length > 0 ? (
        <div>
          {cart.map((game) => (
            <Col md={3} key={game.id}>
              <GameCard game={game} />
            </Col>
          ))}
        </div>
      ) : (
        <p>No items currently in the cart! Let's add some</p>
      )}


    </div>
  );
};