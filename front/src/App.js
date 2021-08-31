import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';
import Login from "./Login";
import Questions from "./Questions";
import LoadingScreen from "./LoadingScreen";
import NotFound from "./NotFound";

const backendUrl = "http://localhost:3333"
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

function App() {
  console.log("Starting...");

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
      <BrowserRouter>
        <Header/>
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
        </BrowserRouter>
    </div>
  );
}

export default App;
