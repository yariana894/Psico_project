import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Notes from "./components/Notes/Notes";
import Dashboard from "./components/Notes/Dashboard";
import NoteList from "./components/Notes/NoteList";
import ProtectedRoute from "./components/Notes/ProtectedRoute";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Ruta protegida */}
        <Route
          path="/noteList"
          element={
            <ProtectedRoute>
              <NoteList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/notes"
          element={isAuthenticated ? <Notes /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
