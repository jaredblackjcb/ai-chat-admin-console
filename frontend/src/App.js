import React from "react";
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "./screens/Home";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import ChangePassword from "./screens/ChangePassword";
import ManageSubscription from "./screens/ManageSubscription";
import Profile from "./screens/Profile";
import Header from "./components/Header";
import { store } from "./store/index";

const Layout = ({ hideHeaderOnPaths = [] }) => {
  const { pathname } = useLocation();
  return (
    <>
      {!hideHeaderOnPaths.includes(pathname) && <Header />}
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout hideHeaderOnPaths={["/signup", "/login"]} />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/profile", element: <Profile /> },
      { path: "/subscription", element: <ManageSubscription /> },
      { path: "/security/password", element: <ChangePassword /> },
      // { path: "/checkout/success", element: <ChangePassword /> },
      // { path: "/checkout/canceled", element: <ChangePassword /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
