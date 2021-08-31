import React, { useState } from "react";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        axios.post(
            process.env.REACT_APP_BACKEND_ADDRESS + "/users/login",
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
            if(error.response !== undefined && error.response.status === 401) {
                alert("Wrong credentials!");
            }
            else {
                alert(error.message);
                console.log(error);
                return error.message;
            }
        });
    }

    async function testQuestion(event) {
        event.preventDefault();

        axios.get(
            process.env.REACT_APP_BACKEND_ADDRESS + "/your_questions",
            {})
            .then(response => {
                alert("Got questions");
                console.log(response);
                return response.statusText;
            })
            .catch(error => {
                if(error.response.status === 401) {
                    alert("Unauthorized");
                }
                else {
                    alert(error.message);
                    console.log(error);
                    return error.message;
                }
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
                <Button block size="lg" type="button" onClick={testQuestion}>
                    Questions
                </Button>
            </Form>
        </div>
    );
}

export default Login;