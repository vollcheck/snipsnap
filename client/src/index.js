import EditSnap, { action as editAction } from "./routes/EditSnap";
import Index, { loader as indexLoader } from "./routes/Index";
import Root, { action as rootAction } from "./Root";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Snap, {
  action as snapAction,
  loader as snapLoader,
} from "./routes/Snap";

import ErrorPage from "./error-page";
import React from "react";
import ReactDOM from "react-dom/client";
import { action as destroySnapAction } from "./routes/DeleteSnap";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index />, loader: indexLoader },
          {
            path: "snap/:snapId",
            element: <Snap />,
            loader: snapLoader,
            action: snapAction,
          },
          {
            path: "snap/:snapId/edit",
            element: <EditSnap />,
            loader: snapLoader,
            action: editAction,
          },
          {
            path: "snap/:snapId/destroy",
            action: destroySnapAction,
            errorElement: <div>Oops! There was an error.</div>,
          },
          {
            path: "me",
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
