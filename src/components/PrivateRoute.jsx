import { useAuth } from '../context/AuthContext';
import {Navigate} from 'react-router-dom';

/*function PrivateRoute({children}) {
  const { user, loading } = useAuth();
  if (user) {
    return children
  } else if (loading) {
    return <div className="chargement">Chargement...</div>
  } else {
    return <Navigate to="/login" />
  }
}*/

function PrivateRoute({children}) {
  const { user, loading } = useAuth();
  if (loading) {
	return <div className="chargement">Chargement...</div>
  } else {
    return children
  }
}

export default PrivateRoute;