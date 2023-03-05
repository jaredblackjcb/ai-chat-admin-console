import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./screens/Home";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import ChangePassword from "./screens/ChangePassword";
import ManageSubscription from "./screens/ManageSubscription";
import Profile from "./screens/Profile";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/profile", element: <Profile /> },
  { path: "/subscription", element: <ManageSubscription /> },
  { path: "/security/password", element: <ChangePassword /> },
  // { path: "/checkout/success", element: <ChangePassword /> },
  // { path: "/checkout/canceled", element: <ChangePassword /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
