import { useAuth } from '../context/AuthContext';
import {Navigate} from 'react-router-dom';

function PrivateRoute({children}) {
  const { user, token, loading } = useAuth();
    return (
      <>
      {user ? children (
        <Navigate to="/login" />
      ) : loading == true (
        <div className="chargement">Chargement...</div>
      )}
      </>
    )
}

export default PrivateRoute;