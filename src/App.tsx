import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import DashboardUsuari from './components/Dashboard/DashboardUsuari';
import DashboardAdmin from './components/admin/DashboardAdmin';
import CrearMascota from './components/Dashboard/CrearMascota';
import MascotaDetall from './components/Dashboard/MascotaDetall';
import { isAuthenticated, isTokenExpired, logoutUser } from './services/authService';

// Configuración del interceptor de Axios
axios.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        if (token && isTokenExpired(token)) {
            logoutUser();
            alert("Tu sesión ha expirado. Inicia sesión nuevamente.");
            return Promise.reject("Token expirado");
        }
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
            console.log('Adding token to headers:', config.headers);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Definimos la interfaz para los props de ProtectedRoute
interface ProtectedRouteProps {
    element: React.ReactNode; // o React.ReactElement si prefieres
}

// Asegúrate de tipar correctamente el componente
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
        logoutUser();
        return <Navigate to="/login" />;
    }
    return <>{element}</>; // Renderiza el elemento protegido
};

const App: React.FC = () => {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={
                        <div
                            style={{
                                backgroundImage: 'url("/assets/portada.jpg")', // Ruta correcta
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                minHeight: '100vh',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                textAlign: 'center',
                            }}
                        >
                            <header>
                                <h1>Mascota Virtual</h1>
                                <h2>(only Dogs)</h2>
                                <div className="button-container">
                                    <button onClick={() => window.location.href = '/login'} className="App-button">Iniciar sesión</button>
                                    <button onClick={() => window.location.href = '/register'} className="App-button">Nou usuari</button>
                                </div>
                            </header>
                        </div>
                    } />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    {/* Rutas protegidas */}
                    <Route path="/dashboard" element={<ProtectedRoute element={<DashboardUsuari />} />} />
                    <Route path="/dashboard-admin" element={<ProtectedRoute element={<DashboardAdmin />} />} />
                    <Route path="/crear-mascota" element={<ProtectedRoute element={<CrearMascota />} />} />
                    <Route path="/mascota-detall/:id" element={<ProtectedRoute element={<MascotaDetall />} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
