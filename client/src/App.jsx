import "./App.css";

import { getHealthcheck, listSnaps } from "./client";
import { useEffect, useState } from "react";

import SnapList from "./components/SnapList";
import SnapCard from "./components/SnapCard";

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
      // probably to be moved to other things
      const response = await listSnaps();
      console.log(response);
      setSnaps(response);
    })();
  }, []);

  return (
    <div className="App">
      <main className="container">
        <h1>Hello, world!</h1>
        <h3>{message}</h3>
        <SnapCard snap={snaps[0]} />
        <SnapList snaps={snaps} />
      </main>
    </div>
  );
};

export default App;
