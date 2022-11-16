import { Form, useFetcher, useLoaderData } from "react-router-dom";
import { getSnap, login, test_cors, upsertSnap } from "../client";

import SnapCard from "../components/SnapCard";

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

// TODO: to remove
const snapToRemove = {
  "snap/id": 1,
  "snap/user_id": 1,
  "user/username": "vollcheck",
  "snap/name": "sum of two integers",
  "snap/content": "(defn sum [x y] (+ x y))",
  "snap/language_id": 1,
  "language/name": "Clojure",
  "snap/create_date": null,
  "snap/update_date": null,
};

export async function action({ request, params }) {
  let formData = await request.formData();
  return upsertSnap(params.snapId, {
    favorite: formData.get("favorite") === "true",
  });
}

export default function Snap() {
  const snap = useLoaderData();
  console.log(snap);

  // const creds = { username: "vollcheck", password: "admin" };
  // const user = test_cors(creds);
  // console.log(user);

  // return (
  //   <div id="snap">
  //     <div>
  //       <Form action="edit">
  //         <button type="submit">Edit</button>
  //       </Form>
  //       <Form
  //         method="post"
  //         action="destroy"
  //         onSubmit={(event) => {
  //           if (
  //             !window.confirm("Please confirm you want to delete this record.")
  //           ) {
  //             event.preventDefault();
  //           }
  //         }}
  //       >
  //         <button type="submit">Delete</button>
  //       </Form>
  //     </div>

  //     <div>
  //       <h2>
  //         {snap["user/username"] || snap["snap/name"] ? (
  //           <>
  //             {snap["user/username"]} / {snap["snap/name"]}
  //           </>
  //         ) : (
  //           <i>No Name</i>
  //         )}{" "}
  //       </h2>

  //       {snap["language/name"] && <p>Language: {snap["language/name"]}</p>}

  //       {snap["snap/create_date"] && <p>Created: {snap["snap/create_date"]}</p>}

  //       {snap["snap/update_date"] && <p>Updated: {snap["snap/update_date"]}</p>}

  //       {snap["snap/content"] && <code>{snap["snap/content"]}</code>}
  //     </div>
  //   </div>
  // );

  return <SnapCard snap={snap} />;
}

// function Favorite({ snap }) {
//   const fetcher = useFetcher();
//   // yes, this is a `let` for later
//   let favorite = snap["language/name"];
//   if (fetcher.formData) {
//     favorite = fetcher.formData.get("favorite") === "true";
//   }

//   return (
//     <fetcher.Form method="post">
//       <button
//         name="favorite"
//         value={favorite ? "false" : "true"}
//         aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
//       >
//         {favorite ? "★" : "☆"}
//       </button>
//     </fetcher.Form>
//   );
// }

// <Favorite snap={snap} />;
