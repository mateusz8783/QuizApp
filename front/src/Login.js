import React, { useState } from "react";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./Login.css";
import LoaderButton from "./components/LoaderButton";
import { useAppContext } from "./Context";
import { onError } from "./Error";
import { useFormFields } from "./CustomHooks";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        username: "",
        password: ""
    });
    const history = useHistory();

    function validateForm() {
        return fields.username.length > 0 && fields.password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        let username = fields.username;
        let password = fields.password;

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
            setIsLoading(false);
            userHasAuthenticated(true);
            console.log(response);
            history.push("/profile")
            return response.statusText;
        })
        .catch(error => {
            setIsLoading(false);
            if(error.response !== undefined && error.response.status === 401) {
                alert("Wrong credentials!");
            }
            else {
                onError(error);
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
                if(error.response !== undefined && error.response.status === 401) {
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
                        value={fields.username}
                        className="form-input"
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={fields.password}
                        className="form-input"
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <LoaderButton
                    block
                    size="lg"
                    type="submit"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Login
                </LoaderButton>
            </Form>
        </div>
    );
}

export default Login;