import { deleteSnap } from "../client";
import { redirect } from "react-router-dom";

export async function action({ params }) {
  throw new Error("oh dang! deletion is not implemented yet!");
  await deleteSnap(params.snapId);
  return redirect("/");
}
