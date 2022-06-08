import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { ReactNotifications } from "react-notifications-component";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./components/context/Context";
import Profile from "./components/profile/Profile.jsx"
import { useNavigate } from "react-router";
function App() {
  const { user,dispatch } = useContext(Context);
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
        <Route exact path="/" element={user ? <Home handleLogout={handleLogout}/> : <Login />} />
        <Route
          exact
          path="/register"
          element={user ? <Home /> : <Register />}
        />

        <Route exact path="/login" element={user ? <Home handleLogout={handleLogout}/> : <Login />} />
        <Route exact path="/profile" element={user ? <Profile handleLogout={handleLogout} /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;