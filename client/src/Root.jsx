import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getHealthcheck, listSnaps, upsertSnap } from "./client";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import SnapList from "./components/SnapList";
import SnipSnapFooter from "./components/Footer";
import useToken from "./components/useToken";

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

  const { token, setToken } = useToken();

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
