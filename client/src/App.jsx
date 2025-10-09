import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Navbar from "./components/Navbar"; // Import Navbar
import Footer from "./components/Footer"; // Import Footer
import ConvertedFilesHistory from "./pages/ConvertedFilesHistory";
import Profile from "./pages/Profile";
import { useEffect } from "react";

function Root() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return null;
}

function Layout({ children }) {
  const location = useLocation();

  // Define paths where Navbar and Footer should NOT be displayed
  const hideLayoutPaths = ["/login", "/register", "/forgot-password", "/reset-password"];
  const shouldShowLayout = !hideLayoutPaths.some(path => location.pathname.startsWith(path));

  return (
    <div className="flex flex-col min-h-screen">
      {shouldShowLayout && <Navbar />}
      
      <main className="flex-grow">{children}</main>

      {shouldShowLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/conversion-history" element={<ConvertedFilesHistory/>}/>
          <Route path="/profile" element={<Profile/>} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
