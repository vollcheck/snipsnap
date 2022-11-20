import SnapList from "../components/SnapList";
import { listSnaps } from "../client";
import { useLoaderData } from "react-router-dom";

export async function loader({ request }) {
  // const url = new URL(request.url);
  // const q = url.searchParams.get("q");
  // const snaps = await listSnaps(q);
  // return { snaps, q };
  const snaps = await listSnaps();
  return { snaps };
}

export default function Index() {
  const { snaps } = useLoaderData();

  return (
    <p id="zero-state">
      <SnapList snaps={snaps} />
    </p>
  );
}
