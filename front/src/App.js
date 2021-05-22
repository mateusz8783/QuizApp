import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './Header';

const backendUrl = "http://localhost:3333"
var apiState;
var apiRes;

// function callAPI() {
//   console.log("Calling API...");
//
//   var response = fetch(backendUrl)
//       .then(res => apiRes = res.text())
//       .then(status => apiState = status)
//       .catch(err => err);
//
//   console.log(response);
//   console.log(apiRes);
//   console.log(apiState);
//   return;
// }

function getApiResponsePromise() {
  console.log("Calling APIresponse...");
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      var response = fetch(backendUrl)
          .then(res => apiRes = res.text())
          .then(status => apiState = status)
          .catch(err => err);
      response ? resolve(response) : reject("API call timed out");
    }, 2000);
  })
}

function App() {
  console.log("Starting...");
  //callAPI();
  let test;
  // getApiResponsePromise()
  //     .then(res => {
  //       console.log(res);
  //       test = res;
  //       return true;
  //     })
  //     .catch(err => console.log("There was an error:" + err))

  //const [count, callAPI] = useState(0);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    // callAPI();

    document.title = `Testing variable ${apiResponse} here`;
  });

  const [apiResponse, setApiResponse] = React.useState();
  React.useEffect(() => {
    async function getApiResponse() {
      const res = await getApiResponsePromise(); // type: Promise<Interface>
      setApiResponse(res);
    }

    getApiResponse();
  }, [])
  if (!apiResponse) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
        <BrowserRouter>
            <Header/>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              This is a home page
            </p>
            <p className="App-intro">
              Api call: {apiResponse}
            </p>
          </header>
        </BrowserRouter>
    </div>
  );
}

export default App;
