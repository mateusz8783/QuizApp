import React, { useState } from "react";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

const backendLoginUrl = "http://localhost:3333/users/login"

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        axios.post(
            backendLoginUrl,
            {},
            {
                params: {
                    username,
                    password
                }
            }
        )
        .then(response => {
            alert("Logged in");
            console.log(response);
            return response.statusText;
        })
        .catch(error => {
            alert(error.message);
            console.log(error);
            return error.message;
        });
    }

    return (
        <div className="login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={username}
                        className="form-input"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        className="form-input"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                </Button>
            </Form>
        </div>
    );
}

export default Login;