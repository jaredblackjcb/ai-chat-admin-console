import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ChangePassword from "./pages/ChangePassword";
import ManageSubscription from "./pages/ManageSubscription";
import Profile from "./pages/Profile";

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
