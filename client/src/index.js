//import "./App.css";

import EditSnap, { action as editAction } from "./routes/EditSnap";
import Root, { action as rootAction, loader as rootLoader } from "./Root";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Snap, {
  action as snapAction,
  loader as snapLoader,
} from "./routes/Snap";

import ErrorPage from "./error-page";
import Index from "./routes/Index";
import React from "react";
import ReactDOM from "react-dom/client";
import { action as destroyAction } from "./routes/DeleteSnap";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
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
            action: destroyAction,
            errorElement: <div>Oops! There was an error.</div>,
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
