// src/components/MascotaCard.tsx
import React from 'react';
import { MascotaDTO } from '../../types/types';
import mascotaIcons from '../../assets/mascotaIcons'; // Ajusta según la estructura de tu proyecto

interface MascotaCardProps {
    mascota: MascotaDTO;
    onSelect: () => void;
    onDelete: () => void;
}

const MascotaCard: React.FC<MascotaCardProps> = ({ mascota, onSelect, onDelete }) => {
    // Genera la clave para acceder a la imagen
    const iconKey = `${mascota.tipus}_${mascota.estat}`;

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation(); // Evitar que el evento de clic se propague al contenedor
        const confirmDelete = window.confirm(`¿Estás seguro de que quieres eliminar a ${mascota.nom}?`);
        if (confirmDelete) {
            onDelete(); // Si el usuario confirma, llama a la función onDelete
        }
    };

    return (
        <div
            className="mascota-card"
            onClick={onSelect}
            style={{
                backgroundColor: '#ffffff', // Fondo blanco para mayor visibilidad
                border: '2px solid #333',   // Borde gris oscuro
                borderRadius: '12px',        // Borde redondeado
                padding: '10px',             // Espaciado interno
                textAlign: 'center',         // Centramos el contenido
                cursor: 'pointer',
                margin: '3px',               // Muy poco espacio entre las cards
                width: '95%',                // Ancho ligeramente incrementado
                maxWidth: '240px'            // Tamaño máximo
            }}
        >
            {/* Mostrar la imagen de la mascota */}
            <img
                src={mascotaIcons[iconKey] || '/assets/icons/default_image.png'} // Imagen por defecto si no hay coincidencia
                alt={`Imagen de ${mascota.nom}`}
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }} // Ajusta el tamaño y el borde según sea necesario
            />
            <h4 style={{ fontSize: '1rem', margin: '8px 0' }}>{mascota.nom}</h4> {/* Ajustamos el tamaño del texto y el margen */}
            <button onClick={handleDelete} className="btn btn-danger btn-sm">
                Eliminar
            </button>
        </div>
    );
};

export default MascotaCard;
