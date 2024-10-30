import React, { useState, useRef, useEffect } from 'react';
import { registerUser, storeUserData } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [nomUsuari, setNomUsuari] = useState('');
    const [contrasenya, setContrasenya] = useState('');
    const [message, setMessage] = useState('');
    const nomUsuariRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        nomUsuariRef.current?.focus();
    }, []);

    const handleRegister = async () => {
        if (!nomUsuari || !contrasenya) {
            setMessage('Por favor, completa todos los campos.');
            return;
        }
        try {
            const response = await registerUser(nomUsuari, contrasenya);
            const { token, usuariDTO } = response;
            storeUserData(token, usuariDTO);
            setMessage('Usuari registrat i autenticat amb èxit');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error en el registre:', error);
            setMessage('Error en el registre. Intenta-ho de nou.');
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
                <h2 className="text-center">Registre</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
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
                        Registrar-se
                    </button>
                    {message && <p className="mt-3 text-center">{message}</p>}
                    <button 
                        type="button" 
                        className="btn btn-secondary btn-sm w-100 mt-2"
                        onClick={() => navigate('/')} // Cambia '/home' a la ruta a la que quieras regresar
                    >
                        Tornar Enrere
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
