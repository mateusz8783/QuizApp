import React, {useState} from "react";
import axios from "axios";

import "./Profile.css";
import LoadingScreen from "./LoadingScreen";
import {AppContext} from "./Context";
import LoaderButton from "./components/LoaderButton";
import {useFormFields} from "./CustomHooks";
import {useHistory} from "react-router-dom";
import {onError} from "./Error";
import Form from "react-bootstrap/Form";

function Profile() {
    const [profile, setProfile] = React.useState();
    React.useEffect(() => {
        async function getProfile() {
            axios.get(
                process.env.REACT_APP_BACKEND_ADDRESS + "/users/profile",
                {})
                .then(response => {
                    setProfile(response.data);
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

        getProfile(); // TODO: ignored Promise
    }, [])

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

    function renderProfile() {
        return (
            <div className="profile-container container">
                <div className="row gutters">
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="account-settings">
                                    <div className="user-profile">
                                        <div className="user-avatar">
                                            <img src={`${process.env.REACT_APP_BACKEND_ADDRESS}/images/${profile.profileimage}`}
                                                 alt="Profile picture"/>
                                        </div>
                                        <h5 className="user-name">{profile.name}</h5>
                                        <h6 className="user-email">{profile.email}</h6>
                                        <h7 className="mb-2 text-primary">{profile.username}</h7>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 className="mb-3 text-primary">Account Settings</h6>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <Form.Group controlId="name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control
                                                autoFocus
                                                type="text"
                                                value={fields.name}
                                                onChange={handleFieldChange}
                                                placeholder="Name"
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <Form.Group controlId="email" size="lg">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control
                                                autoFocus
                                                type="email"
                                                value={fields.email}
                                                onChange={handleFieldChange}
                                                placeholder="Email"
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <Form.Group controlId="username" size="lg">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control
                                                autoFocus
                                                type="text"
                                                value={fields.username}
                                                onChange={handleFieldChange}
                                                placeholder="Username"
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <Form.Group controlId="password" size="lg">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                value={fields.password}
                                                onChange={handleFieldChange}
                                                placeholder="Password"
                                            />
                                        </Form.Group>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <Form.Group controlId="confirmPassword" size="lg">
                                            <Form.Label>Confirm Password</Form.Label>
                                            <Form.Control
                                                type="password"
                                                onChange={handleFieldChange}
                                                value={fields.confirmPassword}
                                            />
                                        </Form.Group>
                                    </div>
                                    <Form.Group controlId="file" style={{marginTop: 20}}>
                                        <Form.Control
                                            type="file"
                                            onChange={(e) => setSelectedFile(e.target.files[0])}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="row gutters">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div className="text-right" style={{marginTop: 20}}>
                                            {renderEditButton()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <AppContext.Consumer>
                {({isAuthenticated, userHasAuthenticated}) => (
                    isAuthenticated === true ? <LoadingScreen/> : renderUnauthorized()
                )}
            </AppContext.Consumer>
        );
    }

    function renderUnauthorized() {
        return (
            <div>NOT OK</div>
        );
    }

    return (
        <AppContext.Consumer>
            {({isAuthenticated, userHasAuthenticated}) => (
                isAuthenticated === true ? renderProfile() : renderUnauthorized()
            )}
        </AppContext.Consumer>
    );
}

export default Profile;
