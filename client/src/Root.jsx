import { Outlet, redirect, useNavigation } from "react-router-dom";

import Navbar from "./components/Navbar";
import SnipSnapFooter from "./components/Footer";
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
        <Outlet />
        <SnipSnapFooter />
      </div>
    </>
  );
};

export default Root;
