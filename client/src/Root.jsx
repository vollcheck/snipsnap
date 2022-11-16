import {
  Form,
  Link,
  NavLink,
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getHealthcheck, listSnaps, upsertSnap } from "./client";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import SnapCard from "./components/SnapCard";
import SnapList from "./components/SnapList";
import SnapPreview from "./components/SnapPreview";

const SnapApp = () => {
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
    <main className="container">
      <h1>Hello, world!</h1>
      <h3>{message}</h3>
      <SnapPreview snap={snaps[0]} />
      <SnapList snaps={snaps} />
    </main>
  );
};

export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const snaps = await listSnaps(q);
  return { snaps, q };
}

export async function action() {
  const snap = await upsertSnap();
  return redirect(`/snap/${snap.id}/edit`);
}

const Root = () => {
  const { snaps, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div id="sidebar">
        <h1>Snipsnap</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search snaps"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {snaps.length ? (
            <ul>
              {snaps.map((snap, index) => (
                // <li key={snap["snap/id"]}>
                //   <NavLink
                //     to={`snap/${snap["snap/id"]}`}
                //     className={({ isActive, isPending }) =>
                //       isActive ? "active" : isPending ? "pending" : ""
                //     }
                //   >
                //     {snap["user/username"] || snap["snap/name"] ? (
                //       <>
                //         <span>
                //           {snap["user/username"]} / {snap["snap/name"]}
                //         </span>
                //       </>
                //     ) : (
                //       <i>No snap name</i>
                //     )}{" "}
                //     {snap["language/name"]}
                //   </NavLink>
                // </li>
                <li key={index}>
                  <SnapCard snap={snap} />
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No snaps!</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
};

export default Root;
