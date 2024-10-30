// src/components/admin/UserList.tsx

import React from 'react';
import { UsuariDTO } from '../../types/types';

interface UserListProps {
    users: UsuariDTO[];
    onDelete: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onDelete }) => {
    const handleDelete = (userId: string) => {
        const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este usuario?');
        if (confirmDelete) {
            onDelete(userId); // Si el usuario confirma, llama a la función onDelete
        }
    };

    return (
        <section
            style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco semitransparente
                padding: '1rem',
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                maxWidth: '800px',
                margin: '0 auto',
            }}
        >
            <h3>Usuaris</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {users.map(user => (
                    <li
                        key={user.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '0.75rem 0',
                            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        {/* Nombre de usuario */}
                        <span style={{ flex: 1 }}>{user.nomUsuari}</span>

                        {/* ID de usuario con espacio para 24 caracteres */}
                        <span style={{ flex: 2, fontFamily: 'monospace', fontSize: '0.9rem' }}>{user.id}</span>

                        {/* Rol o botón de eliminar según el rol */}
                        <span style={{ flex: 1 }}>
                            {user.rol === 'ADMIN' ? (
                                <span>Admin</span>
                            ) : (
                                <button onClick={() => handleDelete(user.id!)} className="btn btn-danger btn-sm">
                                    Eliminar
                                </button>
                            )}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default UserList;
