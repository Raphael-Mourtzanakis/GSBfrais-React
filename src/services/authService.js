// Import de la bibliothèque JavaScript "Axios" 
import axios from 'axios';

// URL de l'API
//export const API_URL = 'http://gsb.julliand.etu.lmdsio.com/api/';
export const API_URL = 'http://localhost:8000/api/';

export const signIn = async (login, password) => { 
    const response = await axios.post(`${API_URL}Visiteur/authentifier`, {login: login, password: password }); 
    if (response.data.token) { 
        localStorage.setItem('user', JSON.stringify(response.data.visiteur)); 
        localStorage.setItem('token', response.data.token); 
    }
    return response.data; 
};

export const signOut = () => { 
    localStorage.removeItem('user'); 
    localStorage.removeItem('token');
};

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user')); 
};

export const getAuthToken = () => { 
    return localStorage.getItem('token');
};