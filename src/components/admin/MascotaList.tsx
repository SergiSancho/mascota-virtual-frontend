// src/components/admin/MascotaList.tsx

import React from 'react';
import { MascotaDTO } from '../../types/types';

interface MascotaListProps {
    mascotes: MascotaDTO[];
    onDelete: (mascotaId: string) => void;
}

const MascotaList: React.FC<MascotaListProps> = ({ mascotes, onDelete }) => {
    const handleDelete = (mascotaId: string) => {
        const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar esta mascota?');
        if (confirmDelete) {
            onDelete(mascotaId); // Si el usuario confirma, llama a la función onDelete
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
            <h3>Mascotes</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {/* Encabezados de columnas */}
                <li
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0.75rem 0',
                        fontWeight: 'bold',
                        borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
                    }}
                >
                    <span style={{ flex: 1 }}>Nom</span>
                    <span style={{ flex: 2 }}>ID</span>
                    <span style={{ flex: 1 }}>Tipus</span>
                    <span style={{ flex: 1 }}>Estat</span>
                    <span style={{ flex: 1 }}>Propietari ID</span>
                    <span style={{ flex: 1 }}>Entorn</span>
                    <span style={{ flex: 1 }}>Acciones</span>
                </li>
                {mascotes.map(mascota => (
                    <li
                        key={mascota.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '0.75rem 0',
                            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        {/* Nombre de la mascota */}
                        <span style={{ flex: 1, fontSize: '0.9rem' }}>{mascota.nom}</span>

                        {/* ID de la mascota con espacio para 24 caracteres */}
                        <span style={{ flex: 2, fontFamily: 'monospace', fontSize: '0.9rem' }}>{mascota.id}</span>

                        {/* Tipo de mascota */}
                        <span style={{ flex: 1, fontSize: '0.9rem' }}>{mascota.tipus}</span>

                        {/* Estado de la mascota */}
                        <span style={{ flex: 1, fontSize: '0.9rem' }}>{mascota.estat}</span>

                        {/* ID del propietario con fuente más pequeña */}
                        <span style={{ flex: 1, fontSize: '0.8rem' }}>{mascota.propietariId}</span>

                        {/* Entorn */}
                        <span style={{ flex: 1, fontSize: '0.9rem' }}>{mascota.entorn}</span>

                        {/* Botón de eliminar */}
                        <span style={{ flex: 1 }}>
                            <button onClick={() => handleDelete(mascota.id!)} className="btn btn-danger btn-sm">
                                Eliminar
                            </button>
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default MascotaList;
