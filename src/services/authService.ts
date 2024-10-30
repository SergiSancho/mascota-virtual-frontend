import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse } from '../types/types';
// URL de la API de autenticación
const API_URL = 'http://localhost:8080/api/auth';  // Ajusta según tu backend


// Función para registrar un nuevo usuario
export const registerUser = async (nomUsuari: string, contrasenya: string): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/register`, { nomUsuari, contrasenya });
    return response.data; // Retorna la respuesta que contiene el token y usuariDTO
};

// Función para iniciar sesión
export const loginUser = async (nomUsuari: string, contrasenya: string): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/login`, { nomUsuari, contrasenya });
    return response.data; // Retorna la respuesta que contiene el token y usuariDTO
};

// Función para almacenar la información del usuario en localStorage
export const storeUserData = (token: string, usuariDTO: AuthResponse['usuariDTO']) => {
    localStorage.setItem('token', token); // Almacena el token en localStorage
    localStorage.setItem('usuari', JSON.stringify(usuariDTO)); // Almacena el objeto usuario como cadena JSON
};

// Función para obtener el nombre del usuario almacenado
export const getUserName = (): string | null => {
    const usuari = localStorage.getItem('usuari'); // Recupera el objeto usuario de localStorage
    return usuari ? JSON.parse(usuari).nomUsuari : null; // Devuelve el nombre de usuario o null si no existe
};

// Función para obtener el rol del usuario almacenado
export const getUserRole = (): string | null => {
    const usuari = localStorage.getItem('usuari'); // Recupera el objeto usuario de localStorage
    return usuari ? JSON.parse(usuari).rol : null; // Devuelve el rol del usuario o null si no existe
};

// Función para obtener el ID del usuario almacenado
export const getUserId = (): string | null => {
    const usuari = localStorage.getItem('usuari'); // Recupera el objeto usuario de localStorage
    return usuari ? JSON.parse(usuari).id : null; // Devuelve el ID del usuario o null si no existe
};

// Función para cerrar sesión
export const logoutUser = () => {
    localStorage.removeItem('token'); // Elimina el token de localStorage
    localStorage.removeItem('usuari'); // Elimina el objeto usuario de localStorage
};

// Verificar si el usuario está autenticado

export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    const expired = token && isTokenExpired(token);
    console.log('Token:', token, 'Expired:', expired); // Para ver el estado del token
    return !!token && !expired; // Devuelve true si el token existe y no ha expirado
};


interface DecodedToken {
    exp: number;
    iat?: number;
}

export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp ? decoded.exp < currentTime : true;
    } catch (error) {
        return true;
    }
};

