import React, {useRef, useState} from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "./components/LoaderButton";
import {AppContext, useAppContext} from "./Context";
import { useFormFields } from "./CustomHooks";
import { onError } from "./Error.js";
import "./Signup.css";
import axios from "axios";

function Signup() {
    const [fields, handleFieldChange] = useFormFields({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: ""
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return (
            fields.name.length > 0 &&
            fields.email.length > 0 &&
            fields.username.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    async function handleSubmitRegister(event) {
        event.preventDefault();

        setIsLoading(true);

        const formData = new FormData();
        formData.append("name", fields.name);
        formData.append("email", fields.email);
        formData.append("username", fields.username);
        formData.append("password", fields.password);
        formData.append("password2", fields.confirmPassword);
        formData.append('profileimage', selectedFile)

        axios.post(
            process.env.REACT_APP_BACKEND_ADDRESS + "/users/register",
            formData,
            {}
        )
        .then(response => {
            setIsLoading(false);

            console.log(response);
            history.push("/login")
            return response.statusText;
        })
        .catch(error => {
            setIsLoading(false);

            onError(error);
            console.log(error);
            return error.message;
        });
    }

    async function handleSubmitEdit(event) {
        event.preventDefault();

        setIsLoading(true);

        const formData = new FormData();
        formData.append("name", fields.name);
        formData.append("email", fields.email);
        formData.append("username", fields.username);
        formData.append("password", fields.password);
        formData.append("password2", fields.confirmPassword);
        formData.append('profileimage', selectedFile)

        axios.post(
            process.env.REACT_APP_BACKEND_ADDRESS + "/edit",
            formData,
            {}
        )
            .then(response => {
                setIsLoading(false);

                console.log(response);
                history.push("/login")
                return response.statusText;
            })
            .catch(error => {

                setIsLoading(false);

                if(error.response.status === 401) {
                    alert("Unauthorized");
                }
                else {
                    onError(error);
                }
                console.log(error);
                return error.message;
            });
    }

    function renderSignupButton() {
        return (
            <LoaderButton
                block
                size="lg"
                type="submit"
                variant="success"
                isLoading={isLoading}
                disabled={!validateForm()}
            >
                Signup
            </LoaderButton>
        );
    }

    function renderEditButton() {
        return (
            <LoaderButton
                block
                size="lg"
                type="submit"
                variant="success"
                isLoading={isLoading}
                disabled={!validateForm()}
                onClick={handleSubmitEdit}
            >
                Edit
            </LoaderButton>
        );
    }

    function renderForm() {
        return (
            <Form onSubmit={handleSubmitRegister}>
                <Form.Group controlId="name" size="lg">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={fields.name}
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <Form.Group controlId="email" size="lg">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <Form.Group controlId="username" size="lg">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={fields.username}
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <Form.Group controlId="password" size="lg">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <Form.Group controlId="confirmPassword" size="lg">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        onChange={handleFieldChange}
                        value={fields.confirmPassword}
                    />
                </Form.Group>
                <Form.Group controlId="file">
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    />
                </Form.Group>
                <AppContext.Consumer>
                    {({isAuthenticated, userHasAuthenticated}) => (
                        isAuthenticated === true ? renderEditButton() : renderSignupButton()
                    )}
                </AppContext.Consumer>
            </Form>
        );
    }

    return (
        <div className="signup">
            {renderForm()}
        </div>
    );
}

export default Signup;