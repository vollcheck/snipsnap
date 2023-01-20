import EditSnap, { action as editAction } from "./components/EditSnap";
import Index, { loader as indexLoader } from "./components/Index";
import Me, { loader as meLoader } from "./components/Me";
import Root, { loader as rootLoader } from "./Root";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp, { action as signUpAction } from "./components/SignUp";
import SnapDetail, {
  loader as snapDetailLoader,
} from "./components/SnapDetail";
import UserList, { loader as userListLoader } from "./components/UserList";
import UserProfile, {
  loader as userProfileLoader,
} from "./components/UserProfile";

import ErrorPage from "./error-page";
import Login from "./components/Login";
import Logout from "./components/Logout";
import React from "react";
import ReactDOM from "react-dom/client";
import SnapCreate from "./components/SnapCreate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index />, loader: indexLoader },
          {
            path: "snap/:snapId",
            element: <SnapDetail />,
            loader: snapDetailLoader,
          },
          {
            path: "create-snap",
            element: <SnapCreate />,
          },
          {
            path: "snap/:snapId/edit",
            element: <EditSnap />,
            loader: snapDetailLoader,
            action: editAction,
          },
          {
            path: "users",
            element: <UserList />,
            loader: userListLoader,
          },
          {
            path: "user/:username",
            element: <UserProfile />,
            loader: userProfileLoader,
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
            path: "logout",
            element: <Logout />,
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
