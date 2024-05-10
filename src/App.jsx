import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import HomePage from './components/pages/HomePage.jsx';
import NotFoundPage from './components/pages/NotFoundPage.jsx';
import LoginPage from './components/pages/LoginPage.jsx';
import ResumeListPage from "./components/pages/ResumeListPage.jsx";
import PortfolioPage from "./components/pages/PortfolioPage.jsx";
import NetworkingPage from "./components/pages/NetworkingPage.jsx";
import CreateResume from "./components/pages/CreateResume.jsx";
import Navbar from './components/Navbar.jsx';
import './styles/App.css';
import { AuthProvider } from './context/AuthProvider.jsx';
import PrivateRoute from './route/PrivateRoute.jsx'; // Update the path as needed

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="AppBackground">
          <Routes>
            {/* The index route is the Login page which will not render the Navbar */}
            <Route path="/" element={<LoginPage />} /> 
            
            {/* Layout route for pages that include the Navbar, wrapped with PrivateRoute */}
            <Route element={<PrivateRoute><LayoutWithNavbar /></PrivateRoute>}>
              <Route path="/landing" element={<HomePage />} />
              <Route path="/resume-list" element={<ResumeListPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/networking" element={<NetworkingPage />} />
              <Route path="/create-resume/:id?" element={<CreateResume />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

const LayoutWithNavbar = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default App;