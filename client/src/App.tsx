import "./App.css";

import React from "react";
import config from "./config";
import { httpClient } from "./client/index";
import logo from "./logo.svg";

function App() {
  //type Dashboard = { message: string };
  const resp = httpClient.get(config.BASE_URL + "/");
  resp.then((dashboard) => console.log(dashboard["message"]));

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
