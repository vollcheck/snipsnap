import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";

import { upsertSnap } from "../client";

export async function action({ request, params }) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await upsertSnap(params.snapId, updates);
  return redirect(`/snap/${params.snapId}`);
}

export default function EditSnap() {
  const snap = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="snap-form">
      <p>
        <span>Name</span>
        <input
          placeholder="Name"
          aria-label="Snap name"
          type="text"
          name="name"
          defaultValue={snap["snap/name"]}
        />
        <input
          placeholder="CreateDate"
          aria-label="Create Date"
          type="text"
          name="createDate"
          defaultValue={snap["snap/create_date"]}
        />
      </p>
      <label>
        <span>Language</span>
        <input
          type="text"
          name="language"
          placeholder="Clojure"
          defaultValue={snap["language/name"]}
        />
      </label>
      <label>
        <span>User avatar</span>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={snap["user/username"]}
        />
      </label>
      <label>
        <span>Content</span>
        <textarea name="content" defaultValue={snap["snap/content"]} rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </p>
    </Form>
  );
}
