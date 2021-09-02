import React, {useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import {AppContext, useAppContext} from "./Context";

function handleLogout() {
    // const { userHasAuthenticated } = UseAppContext();
    // userHasAuthenticated(false);
}

// TODO: Context not working in separate component, why?
/*function Header() {
    // const [isAuthenticated, userHasAuthenticated] = useState(false);

    return (
        <div className="bg-light">
            <div className="App container py-3">
                <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
                    <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
                        <LinkContainer to="/">
                            <Navbar.Brand className="font-weight-bold text-muted">
                                Quiz App
                            </Navbar.Brand>
                        </LinkContainer>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Nav activeKey={window.location.pathname}>

                                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>

                                    <>
                                        <LinkContainer to="/signup">
                                            <Nav.Link>Signup</Nav.Link>
                                        </LinkContainer>
                                        <LinkContainer to="/login">
                                            <Nav.Link>Login</Nav.Link>
                                        </LinkContainer>
                                    </>

                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </AppContext.Provider>
            </div>
        </div>
    );
}

export default Header;*/