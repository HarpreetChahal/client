import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { ReactNotifications } from "react-notifications-component";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./components/context/Context";
import Profile from "./components/profile/Profile.jsx";
import { useNavigate } from "react-router";
import UserProfile from "./components/userProfile/UserProfile";
function App() {
  const { user, dispatch, token } = useContext(Context);
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <div>
      <ReactNotifications />
      <Routes>
        <Route
          exact
          path="/"
          element={
            token && user ? <Home handleLogout={handleLogout} /> : <Login />
          }
        />
        <Route
          exact
          path="/register"
          element={
            token && user ? <Home handleLogout={handleLogout} /> : <Register />
          }
        />

        <Route
          exact
          path="/login"
          element={
            token && user ? <Home handleLogout={handleLogout} /> : <Login />
          }
        />
        <Route
          exact
          path="/profile"
          element={
            token && user ? <Profile handleLogout={handleLogout} /> : <Login />
          }
        />
        <Route
          exact
          path="/userProfile"
          element={
            token && user ? (
              <UserProfile handleLogout={handleLogout} />
            ) : (
              <Login />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
