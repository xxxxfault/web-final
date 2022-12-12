import {BrowserRouter, Routes, Route} from "react-router-dom";
import Signup from "./components/signup";
import Login from "./components/login";
import Home from "./components/home";
import Search from "./components/search"
import {AuthProvider} from "./contexts/auth-context";
import NavHead from "./components/nav";
import Staff from "./components/staff";
import Profile from "./components/profile";
import ProtectedRoute from "./components/protected-route";
import Order from "./components/my-order";
import ProductDetail from "./components/product-detail";
import Favourite from "./components/favourites";

function App() {
  return (
      <div className="container mb-4">
        <BrowserRouter>
            <AuthProvider>
                <NavHead/>
            <Routes>
                <Route path="/staff" element={
                    <ProtectedRoute>
                    <Staff/>
                    </ProtectedRoute>}/>
              <Route path="/signup" element={<Signup/>}/>
                <Route path="/search" element={<Search/>}/>
              <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/detail/:id" element={<ProductDetail/>}/>
                <Route path="/detail" element={<ProductDetail/>}/>
                <Route path="/profile" element={
                    <ProtectedRoute>
                    <Profile/>
                    </ProtectedRoute>
                }/>
                <Route path="/myorder" element={
                    <ProtectedRoute>
                        <Order/>
                    </ProtectedRoute>
                }/>
                <Route path="/favourite" element={
                    <ProtectedRoute>
                        <Favourite/>
                    </ProtectedRoute>
                }/>


            </Routes>
            </AuthProvider>
        </BrowserRouter>
      </div>
  );
}

export default App;