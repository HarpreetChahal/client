import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { ReactNotifications } from "react-notifications-component";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./components/context/Context";
import Profile from "./components/profile/Profile";

function App() {
  const { user } = useContext(Context);
  return (
    <div>
      <ReactNotifications />
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login />} />
        <Route
          exact
          path="/register"
          element={user ? <Home /> : <Register />}
        />

        <Route exact path="/login" element={user ? <Home /> : <Login />} />
        <Route exact path="/profile" element={user ? <Profile /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;