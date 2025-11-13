import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
      <BrowserRouter>
        {/* Barre de navigation */}
        <Navbar/>

        <AuthProvider>
          <div id="pages">
            {/* Routes de l'application */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;