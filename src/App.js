import "./App.css";
import Register from "./Register";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LinkPage from "./components/LinkPage";
import Unauthorized from "./components/Unauthorized";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import Lounge from "./components/Lounge";
import Missing from "./components/Missing";
import RequireAuthorization from "./components/RequireAuthorization";
import ProtectedRout from "./components/ProtectedRoute";
import Login from "./components/Auth/Login";
import RegisterTest from "./components/Auth/Register";
import ActivationPanel from "./components/Auth/ActivationPanel";
import Home from "./components/pages/Home.";


function App() {
  return (
    <Routes>
      <Route path="login" element={<Login/>} />
      <Route path="register" element={<RegisterTest/>} />

      <Route path="/" element={<Layout />}>
        {/* public routes */}
        {/* <Route path="login" element={<Login />} /> */}
        {/* <Route path="register" element={<Register />} /> */}
        <Route path="activate" element={<ActivationPanel />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        <Route element={<ProtectedRout />}>
          <Route path="/test" element={<p>test</p>} />
        <Route element={<RequireAuthorization allowedRoles={["User"]} />}>
          <Route path="/home" element={<Home />} />

        </Route>
        <Route element={<RequireAuthorization allowedRoles={["Editor"]} />}>
          <Route path="/editor" element={<Editor />} />
          </Route>
          <Route element={<RequireAuthorization allowedRoles={['Admin']} />}>
          <Route path="/admin" element={<Admin />} />
          </Route>
          <Route element={<RequireAuthorization allowedRoles={['Editor', 'Admin']} />}>

          <Route path="/lounge" element={<Lounge />} />
        </Route>
        </Route>

        {/* catch all  */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
