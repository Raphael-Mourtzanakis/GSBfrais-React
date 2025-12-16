import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import './App.css'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import FraisAdd from './pages/FraisAdd'
import FraisEdit from './pages/FraisEdit'
import FraisHorsForfait from './pages/FraisHorsForfait'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
      <BrowserRouter>
        <AuthProvider>
          {/* Barre de navigation */}
          <Navbar/>

          <div id="pages">
            {/* Routes de l'application */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<PrivateRoute> <Dashboard/> </PrivateRoute>} />
              <Route path="/frais/ajouter" element={<PrivateRoute> <FraisAdd/> </PrivateRoute>} />
              <Route path="/frais/modifier/:id" element={<PrivateRoute> <FraisEdit/> </PrivateRoute>} />
			  <Route path="/frais/:id/hors-forfait" element={<PrivateRoute> <FraisHorsForfait/> </PrivateRoute>} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
  );
}

export default App;