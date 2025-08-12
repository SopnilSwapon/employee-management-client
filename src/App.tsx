import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import ManageEmployee from "./components/ManageEmployee";
import Category from "./components/Category";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminlogin" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<Home />}></Route>
          <Route
            path="/dashboard/manage-employees"
            element={<ManageEmployee />}
          ></Route>
          <Route path="/dashboard/category" element={<Category />}></Route>
          <Route path="/dashboard/profile" element={<Profile />}></Route>
          <Route path="/dashboard/logout" element={<Logout />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
