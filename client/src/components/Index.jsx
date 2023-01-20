import SnapList from "../components/SnapList";
import { listSnaps } from "../client";
import { useLoaderData } from "react-router-dom";

export async function loader({ request }) {
  const snaps = await listSnaps();
  return { snaps };
}

export default function Index() {
  const { snaps } = useLoaderData();

  return (
    <div id="zero-state">
      <SnapList snaps={snaps} />
    </div>
  );
}
