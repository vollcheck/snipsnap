import "react-toastify/dist/ReactToastify.css"; // move that to the index

import { Outlet, useLoaderData } from "react-router-dom";
// eslint-disable-next-line
import { ToastContainer, toast } from "react-toastify";

import Navbar from "./components/Navbar";
import SnipSnapFooter from "./components/Footer";
import { listSnaps } from "./client";

export async function loader({ request }) {
  const snaps = await listSnaps();
  return { snaps };
}

const Root = () => {
  return (
    <>
      <div className="container hero is-fullheight">
        <Navbar />
        <Outlet />
        <SnipSnapFooter />
      </div>
    </>
  );
};

export default Root;
