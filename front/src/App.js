import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import React, {useEffect, useState} from 'react'
import { Router, BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';

import './App.css';
import Header from './Header';
import Login from "./Login";
import Questions from "./Questions";
import LoadingScreen from "./LoadingScreen";
import NotFound from "./NotFound";
import { AppContext } from "./Context";
import Navbar from "react-bootstrap/Navbar";
import {LinkContainer} from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";

axios.defaults.withCredentials = true;

var apiState;
var apiRes;

function getApiResponsePromise() {
  console.log("Calling getApiResponsePromise...");
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      var response = fetch(process.env.REACT_APP_BACKEND_ADDRESS)
          .then(res => apiRes = res.text())
          .then(status => apiState = status)
          .catch(err => err);
      response ? resolve(response) : reject("API call timed out");
    }, 2000);
  })
}

const AppWrapper = () => { // so history can be used
  return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
  )
}

const App = () => {
  console.log("Starting...");
  const [isAuthenticated, userHasAuthenticated] = useState();
  const history = useHistory();

  function handleLogout() {
    userHasAuthenticated(false);
    axios.get(process.env.REACT_APP_BACKEND_ADDRESS + "/users/logout");
    history.push("/login");
  }

  const apiResponse = "NULL";
  // const [apiResponse, setApiResponse] = useState("Not responding");
  // React.useEffect(() => {
  //   async function getApiResponse() {
  //     const res = await getApiResponsePromise(); // type: Promise<Interface>
  //     setApiResponse(res);
  //   }
  //
  //   getApiResponse();
  // }, [])
  //
  // if (!apiResponse) {
  //   return <LoadingScreen/>
  // }

  return (
    <div className="App">
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Router history={history}>
          <div className="bg-light">
            <div className="App container py-3">
              <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
                <LinkContainer to="/">
                  <Navbar.Brand className="font-weight-bold text-muted">
                    Quiz App
                  </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Nav activeKey={window.location.pathname}>
                    {isAuthenticated ? (
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    ) : (
                      <>
                        <LinkContainer to="/signup">
                          <Nav.Link>Signup</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/login">
                          <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                      </>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </div>
          </div>
          <div className = "app-content">
            <Switch>
              <Route exact path={"/"} render={props => {
                return(
                  <header className="App-header">
                    <p>
                      This is a home page
                    </p>
                    <p className="App-intro">
                      Api call: {apiResponse}
                    </p>
                  </header>
                );
              }}/>
              <Route path={"/questions"} render={props => <Questions/>}/>
              <Route path={"/login"} render={props => <Login/>}/>
              <Route><NotFound/></Route>
            </Switch>
          </div>
      </Router>
    </AppContext.Provider>
    </div>
  );
}

export default AppWrapper;
