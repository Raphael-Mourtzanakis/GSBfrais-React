import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

function App() {
  return (
      <BrowserRouter>
        {/* Barre de navigation */}
        <Navbar/>

        <div id="pages">
          {/* Routes de l'application */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;