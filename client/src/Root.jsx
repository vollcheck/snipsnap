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

export async function loader({ request }) {
  // const url = new URL(request.url);
  // const q = url.searchParams.get("q");
  // const snaps = await listSnaps(q);
  // return { snaps, q };
  const snaps = await listSnaps();
  return { snaps };
}

export async function action() {
  const snap = await upsertSnap();
  return redirect(`/snap/${snap.id}/edit`);
}

const Root = () => {
  // const { snaps, q } = useLoaderData();
  const { snaps } = useLoaderData();
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
      <Navbar />
      <SnapList snaps={snaps} />
      <Outlet />
      <SnipSnapFooter />
    </>
  );
};

export default Root;
