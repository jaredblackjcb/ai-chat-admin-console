import React from "react";
import { Routes, Navigate, Outlet, useLocation, Route, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./screens/Home";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import ChangePassword from "./screens/ChangePassword";
import ManageSubscription from "./screens/ManageSubscription";
import Profile from "./screens/Profile";
import Header from "./components/Header";
import { store } from "./store/index";
import { useSelector } from "react-redux";
import "./styles/site-bootstrap.scss";

export default function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <HashRouter>
          <Routes>
            <Route path="home" element={<Home />} />
            <Route
              path="signup"
              element={
                <RestrictForAuth>
                  <Signup />
                </RestrictForAuth>
              }
            />
            <Route
              path="login"
              element={
                <RestrictForAuth>
                  <Login />
                </RestrictForAuth>
              }
            />
            <Route path="" element={<h1>Under Construction</h1>} />
            <Route element={<RootLayout />}>
              <Route
                path="dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              ></Route>
              <Route
                path="profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />
              <Route
                path="subscription"
                element={
                  <RequireAuth>
                    <ManageSubscription />
                  </RequireAuth>
                }
              />
              <Route
                path="security/password"
                element={
                  <RequireAuth>
                    <ChangePassword />
                  </RequireAuth>
                }
              />
            </Route>
          </Routes>
        </HashRouter>
      </GoogleOAuthProvider>
    </Provider>
  );
}

const RequireAuth = ({ children }) => {
  const { userInfo } = useSelector((state) => state.userLogin) || {};
  let location = useLocation();
  console.log("requireAuth triggered", location, userInfo);
  // Redirect them to the /login page, but save the current location they were
  // trying to go to when they were redirected. This allows us to send them
  // along to that page after they login, which is a nicer user experience
  // than dropping them off on the home page.
  console.log("redirect to login");
  console.log(location.state);
  return userInfo ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

const RestrictForAuth = ({ children }) => {
  const { userInfo } = useSelector((state) => state.userLogin) || {};
  const location = useLocation();
  console.log("location.state", location.state);
  let { pathname } = location.state?.from || { pathname: "/dashboard" };
  console.log("pathname: " + pathname);
  if (pathname.includes("login") || pathname.includes("register")) {
    pathname = "/dashboard";
    console.log("pathname: " + pathname);
  }
  console.log("pathname: " + pathname);
  return userInfo ? <Navigate to={pathname} state={{ from: location }} replace /> : children;
};

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
