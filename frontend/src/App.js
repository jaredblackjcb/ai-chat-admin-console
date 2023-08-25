import React from "react";
import { Routes, Navigate, Outlet, useLocation, Route, BrowserRouter } from "react-router-dom";
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
import Pricing from "./screens/Pricing";
import { store } from "./store/index";
import { useSelector } from "react-redux";
import "./styles/site-bootstrap.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { loadStripe } from "@stripe/stripe-js/pure";
import { Elements } from "@stripe/react-stripe-js";
import ChatbotConfigDetail from "./screens/ChatbotConfigDetail";

export default function App() {
  // Add Font Awesome icons to global library
  library.add(faCheck);

  // Fetch plans from stripe API and create pricing cards to be populated using the data
  const stripePromise = loadStripe(process.env.STRIPE_TEST_PUBLIC_KEY);

  return (
    // Wrap the app with the Redux store provider
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <BrowserRouter>
            <Routes>
              <Route path="home" element={<Home />} />
              <Route path="pricing" element={<Pricing />} />
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
              <Route
                path="resetPassword"
                element={
                  <RestrictForAuth>
                    <ChangePassword />
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
                <Route
                  path="chatbot/configure/:namespace"
                  element={
                    <RequireAuth>
                      <ChatbotConfigDetail />
                    </RequireAuth>
                  }
                />
                <Route
                  path="subscription/manage"
                  element={
                    <RequireAuth>
                      <ManageSubscription />
                    </RequireAuth>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </Provider>
    </Elements>
  );
}

const RequireAuth = ({ children }) => {
  const { userInfo } = useSelector((state) => state.user) || {};
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

// Detects whether a user is logged in by checking the userInfo property of the
// user from the Redux state. If it exists, the user is redirected to a logged in page.
const RestrictForAuth = ({ children }) => {
  // Access the userInfo property from the Redux state using the useSelector hook
  const { userInfo } = useSelector((state) => state.user) || {};

  // Access the current location using the useLocation hook
  const location = useLocation();
  console.log("location.state", location.state);

  // Access the 'from' property of the location's state or set it to '/dashboard' if not available
  let { pathname } = location.state?.from || { pathname: "/dashboard" };
  console.log("pathname: " + pathname);

  // Check if the current pathname includes 'login' or 'register', and if so, set the pathname to '/dashboard'
  if (pathname.includes("login") || pathname.includes("register")) {
    pathname = "/dashboard";
    console.log("pathname: " + pathname);
  }
  console.log("pathname: " + pathname);

  // If userInfo is available (user is logged in), redirect to the determined pathname
  return userInfo ? <Navigate to={pathname} state={{ from: location }} replace /> : children;
};

// RootLayout component that acts as the layout structure for the app
const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
