import { Form, useFetcher, useLoaderData } from "react-router-dom";
import { getSnap, upsertSnap } from "../client";

export async function loader({ params }) {
  const snap = getSnap(params.snapId);
  if (!snap) {
    throw new Response("", {
      status: 404,
      statusText: "Not found",
    });
  }
  return snap;
}

export async function action({ request, params }) {
  let formData = await request.formData();
  return upsertSnap(params.snapId, {
    favorite: formData.get("favorite") === "true",
  });
}

export default function Snap() {
  const snap = useLoaderData();
  console.log(snap);

  return (
    <div id="snap">
      <div>
        <h1>
          {snap["user/username"] || snap["snap/name"] ? (
            <>
              {snap["user/username"]} / {snap["snap/name"]}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite snap={snap} />
        </h1>

        {snap.twitter && (
          <p>
            <a
              target="_blank"
              href={`https://twitter.com/${snap["language/name"]}`}
            >
              {snap["language/name"]}
            </a>
          </p>
        )}

        {snap["snap/content"] && <p>{snap["snap/content"]}</p>}

        <div>
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !window.confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ snap }) {
  const fetcher = useFetcher();
  // yes, this is a `let` for later
  let favorite = snap["language/name"];
  if (fetcher.formData) {
    favorite = fetcher.formData.get("favorite") === "true";
  }

  return (
    <fetcher.Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
}
