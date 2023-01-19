import { deleteSnap } from "../client";
import { redirect } from "react-router-dom";

export async function action({ params }) {
  await deleteSnap(params.snapId);
  return redirect("/");
}
