import "react-toastify/dist/ReactToastify.css"; // move that to the index

import { Outlet, redirect, useNavigation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Navbar from "./components/Navbar";
import SnipSnapFooter from "./components/Footer";
import { isAuthenticated } from "./utils";
import { upsertSnap } from "./client";

export async function action() {
  const snap = await upsertSnap();
  return redirect(`/snap/${snap.id}/edit`);
}

const Root = () => {
  // const { snaps, q } = useLoaderData();
  const navigation = useNavigation();

  // const submit = useSubmit();

  // const searching =
  //   navigation.location &&
  //   new URLSearchParams(navigation.location.search).has("q");

  // useEffect(() => {
  //   document.getElementById("q").value = q;
  // }, [q]);

  return (
    <>
      <div className="container hero is-fullheight">
        <Navbar />
        <Outlet>
          <div>
            <ToastContainer />
          </div>
        </Outlet>
        <SnipSnapFooter />
      </div>
    </>
  );
};

export default Root;
