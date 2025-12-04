import { useAuth } from '../context/AuthContext';
import {Navigate} from 'react-router-dom';

function PrivateRoute({children}) {
  const { user, token, loading } = useAuth();
    return (
      <>
      {
        loading ? (
          <div className="chargement">Chargement...</div>
        ) : user ?
          children 
        : (
          <Navigate to="/login" />
        )
      }
      </>
    )
}

export default PrivateRoute;