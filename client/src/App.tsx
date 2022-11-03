import "./App.css";

import FetchClient from "./client/fetch.client";
import React from "react";
import config from "./config";
import logo from "./logo.svg";

function App() {
  const client = new FetchClient();
  const resp = client.get(config.BASE_URL + "/");
  resp.then((responseData) => console.log(responseData["message"]));

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Yo, what's up?</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
