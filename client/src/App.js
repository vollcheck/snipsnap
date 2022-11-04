import "./App.css";

import { getHealthcheck, getSnaps } from "./client";
import { useEffect, useState } from "react";

const SnapList = (props) => {
  return (
    <tr key={props["snap/id"]}>
      {/* key={index} */}
      <td>{props["snap/id"]}</td>
      <td>{props["snap/name"]}</td>
      <td>
        <code>{props["snap/content"]}</code>
      </td>
      <td>{props["user/username"]}</td>
      <td>{props["language/name"]}</td>
      <td>{props["snap/update_date"]}</td>
    </tr>
  );
};

const App = () => {
  const [message, setMessage] = useState("");
  const [snaps, setSnaps] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getHealthcheck();
      // console.log(response);
      setMessage(response);
    })();

    (async () => {
      const response = await getSnaps();
      console.log(response);
      setSnaps(response);
    })();
  }, []);

  return (
    <div className="App">
      <main className="container">
        <h1>Hello, world!</h1>
        <h3>{message}</h3>
        <table>
          <tbody>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Content</th>
              <th>Author</th>
              <th>Language</th>
              <th>Last update</th>
            </tr>
            {snaps.map((snap, index) => (
              <tr key={index}>
                <td>{snap["snap/id"]}</td>
                <td>{snap["snap/name"]}</td>
                <td>
                  <code>{snap["snap/content"]}</code>
                </td>
                <td>{snap["user/username"]}</td>
                <td>{snap["language/name"]}</td>
                <td>{snap["snap/update_date"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default App;
