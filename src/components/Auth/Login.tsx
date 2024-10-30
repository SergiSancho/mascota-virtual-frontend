import React, { useState, useRef, useEffect } from 'react';
import { loginUser, storeUserData } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [nomUsuari, setNomUsuari] = useState('');
    const [contrasenya, setContrasenya] = useState('');
    const [message, setMessage] = useState('');
    const nomUsuariRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        nomUsuariRef.current?.focus();
    }, []);

    const handleLogin = async () => {
        if (!nomUsuari || !contrasenya) {
            setMessage('Por favor, completa todos los campos.');
            return;
        }
        try {
            const response = await loginUser(nomUsuari, contrasenya);
            const { token, usuariDTO } = response;
            storeUserData(token, usuariDTO);
            setMessage('Inici de sessió amb èxit');
             // Redireccionar según el rol del usuario
             if (usuariDTO.rol === 'ADMIN') {
                navigate('/dashboard-admin'); // Navegar al DashboardAdmin si el rol es admin
            } else {
                navigate('/dashboard'); // Navegar al DashboardUsuari si no es admin
            }
        } catch (error) {
            console.error("Error en l'inici de sessió:", error);
            setMessage("Error en l'inici de sessió. Si us plau, verifica les teves credencials.");
        }
    };

    return (
        <div 
            style={{
                backgroundImage: 'url("/assets/partida.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div className="container p-4 bg-light rounded shadow" style={{ maxWidth: '270px', opacity: '0.9', marginTop: '150px' }}>
                <h2 className="text-center">Iniciar Sessió</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <div className="mb-3">
                        <label className="form-label">Nom d'usuari</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            value={nomUsuari}
                            onChange={(e) => setNomUsuari(e.target.value)}
                            ref={nomUsuariRef}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contrasenya</label>
                        <input
                            type="password"
                            className="form-control form-control-sm"
                            value={contrasenya}
                            onChange={(e) => setContrasenya(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-sm w-100">
                        Iniciar Sessió
                    </button>
                    {message && <p className="mt-3 text-center">{message}</p>}
                    <button 
                        type="button" 
                        className="btn btn-secondary btn-sm w-100 mt-2"
                        onClick={() => navigate('/')}
                    >
                        Tornar Enrere
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
