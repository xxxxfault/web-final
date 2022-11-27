import {BrowserRouter, Routes, Route} from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import Home from "./components/home";

import {AuthProvider} from "./contexts/auth-context";
import Nav from "./components/nav";
import Staff from "./components/staff";
import Profile from "./components/profile";

function App() {
  return (
      <div className="container">

        <BrowserRouter>
            <AuthProvider>
                <Nav/>
            <Routes>
                <Route path="/staff" element={<Staff/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/profile" element={<Profile/>}/>
          </Routes>
            </AuthProvider>
        </BrowserRouter>
      </div>
  );
}

export default App;