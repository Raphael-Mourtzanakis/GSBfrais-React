import { createContext, useCallback, useContext, useState, useEffect } from 'react';
import { signIn, signOut, getCurrentUser, getAuthToken } from '../services/authService';

// 1. Création du contexte
    const AuthContext = createContext();

// 2. Fournisseur du contexte (AuthProvider)
    export function AuthProvider({ children }) {
        const [user, setUser] = useState(null); // État local pour stocker l'utilisateur (null = non connecté)
        const [token, setToken] = useState(null); // État local pour stocker le token
        const [loading, setLoading] = useState(true);
        
        useEffect(() => { 
            const user = getCurrentUser();
            const token = getAuthToken(); 
            if (user && token) { 
                setUser(user);
                setToken(token);
                setLoading(false); // Fin du chargement si le user et le token sont définis
            }
        }, []
        );

            // 3. Fonction de connexion
            const loginUser = async (login, password) => { 
                const data = await signIn(login, password);
                setUser(data.visiteur);
                setToken(data.access_token);
                return data;
            };

        // 4. Fonction de déconnexion
            const logoutUser = () => {
                signOut();
                setUser(null);
                setToken(null);
            };

        // 5. Valeurs exposées aux composants enfants
            return ( 
                <AuthContext.Provider value={{ user, token, loading, loginUser, logoutUser }}> 
                    {children}
                </AuthContext.Provider> 
            );
    }

// 6. Hook personnalisé pour utiliser le contexte facilement
    export function useAuth() {
        return useContext(AuthContext);
    }