// src/components/admin/DashboardAdmin.tsx

import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../../services/adminService';
import { getAllMascotes, deleteMascota } from '../../services/adminService';
import { isAuthenticated, logoutUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import UserList from './UserList';
import MascotaList from './MascotaList';
import { UsuariDTO, MascotaDTO } from '../../types/types';

const DashboardAdmin: React.FC = () => {
    const [users, setUsers] = useState<UsuariDTO[]>([]);
    const [mascotes, setMascotes] = useState<MascotaDTO[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showUsers, setShowUsers] = useState<boolean>(false);
    const [showMascotes, setShowMascotes] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthAndFetchData = async () => {
            if (!isAuthenticated()) {
                navigate('/login');
                return;
            }
            try {
                await fetchUsers();
                await fetchMascotes();
            } catch (error) {
                setError('Error loading data.');
            }
        };
        checkAuthAndFetchData();
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            const response = await getAllUsers();
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Error fetching users.');
        }
    };

    const fetchMascotes = async () => {
        try {
            const response = await getAllMascotes();
            setMascotes(response.data);
        } catch (error) {
            console.error('Error fetching pets:', error);
            setError('Error fetching pets.');
        }
    };

    const handleDeleteUser = async (userId: string) => {
        try {
            await deleteUser(userId);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
            setError('Error deleting user.');
        }
    };

    const handleDeleteMascota = async (mascotaId: string) => {
        try {
            await deleteMascota(mascotaId);
            fetchMascotes();
        } catch (error) {
            console.error('Error deleting pet:', error);
            setError('Error deleting pet.');
        }
    };

    const handleShowUsers = () => {
        setShowUsers(true);
        setShowMascotes(false);
    };

    const handleShowMascotes = () => {
        setShowUsers(false);
        setShowMascotes(true);
    };

    return (
        <div
            className="container"
            style={{
                backgroundImage: 'url("/assets/admin.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '2rem',
                borderRadius: '8px'
            }}
        >
            <header>
                <h2
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo negro semitransparente
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        display: 'inline-block', // Mantener el fondo justo detrás del texto
                    }}
                >
                    Panell d'administrador
                </h2>
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <button onClick={() => { logoutUser(); navigate('/'); }} className="btn btn-danger">
                        Tancar Sessió
                    </button>
                </div>
            </header>
            <div className="button-container mb-3">
                <button onClick={handleShowUsers} className="btn btn-primary">Veure Usuaris</button>
                <button onClick={handleShowMascotes} className="btn btn-primary ml-2">Veure Mascotes</button>
            </div>
            {error && <p className="text-danger">{error}</p>}
            {showUsers && <UserList users={users} onDelete={handleDeleteUser} />}
            {showMascotes && <MascotaList mascotes={mascotes} onDelete={handleDeleteMascota} />}
        </div>
    );
};

export default DashboardAdmin;
