import EditSnap, { action as editAction } from "./components/EditSnap";
import Index, { loader as indexLoader } from "./components/Index";
import Login, { action as loginAction } from "./components/Login";
import Me, { loader as meLoader } from "./components/Me";
import Root, { action as rootAction } from "./Root";
import {
  RouterProvider,
  createBrowserRouter,
  useRouteLoaderData,
} from "react-router-dom";
import SignUp, { action as signUpAction } from "./components/SignUp";
import Snap, {
  action as snapAction,
  loader as snapLoader,
} from "./components/Snap";
import UserList, { loader as userListLoader } from "./components/UserList";
import UserProfile, { loader as userLoader } from "./components/UserProfile";

import ErrorPage from "./error-page";
import React from "react";
import ReactDOM from "react-dom/client";
import { action as destroySnapAction } from "./components/DeleteSnap";

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
            path: "users",
            element: <UserList />,
            loader: userListLoader,
          },
          {
            path: "user/:username",
            element: <UserProfile />,
            loader: userLoader,
          },
          {
            path: "sign-up",
            element: <SignUp />,
            action: signUpAction,
          },
          {
            path: "login",
            element: <Login />,
            // action: loginAction,
          },
          {
            path: "me",
            element: <Me />,
            loader: meLoader,
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
