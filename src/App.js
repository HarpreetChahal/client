import Topbar from "./components/topbar/Topbar";
import Leftbar from "./components/leftbar/Leftbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { ReactNotifications } from 'react-notifications-component'
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
       <ReactNotifications />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />

        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
