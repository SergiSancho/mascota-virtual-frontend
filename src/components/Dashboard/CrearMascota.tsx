import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createMascota } from '../../services/mascotaService';
import { MascotaDTO, TipusMascota, ColorMascota } from '../../types/types';

const CrearMascota: React.FC = () => {
    const [nom, setNom] = useState('');
    const [tipus, setTipus] = useState<TipusMascota | undefined>(undefined);
    const [color, setColor] = useState<ColorMascota>(ColorMascota.ORIGINAL);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const novaMascota: MascotaDTO = {
            nom,
            tipus,
            color,
        };
        try {
            await createMascota(novaMascota);
            alert('Mascota creada exitosamente');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error creando la mascota:', error);
            alert('Error al crear la mascota. Intenta nuevamente.');
        }
    };

    return (
        <div 
            style={{
                backgroundImage: 'url("/assets/new.webp")', // Cambia la ruta a tu imagen
                backgroundSize: 'cover',
                backgroundPosition: 'bottom',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                color: '#000', // Cambia el color del texto a negro para mayor legibilidad
            }}
        >
            <div className="container p-4 bg-light rounded shadow" style={{ maxWidth: '400px', opacity: '0.9' }}>
                <h2 className="text-center">Crear Nueva Mascota</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            id="nombre"
                            type="text"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="tipo">Tipo de Mascota:</label>
                        <select 
                            id="tipo"
                            value={tipus} 
                            onChange={(e) => setTipus(e.target.value as TipusMascota)} 
                            required
                            className="form-control"
                        >
                            <option value="">Selecciona un tipo</option>
                            <option value={TipusMascota.COLLIE}>Collie</option>
                            <option value={TipusMascota.HUSKY}>Husky</option>
                            <option value={TipusMascota.BEAGLE}>Beagle</option>
                            <option value={TipusMascota.CARLI}>Carli</option>
                        </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="color">Color:</label>
                        <select 
                            id="color"
                            value={color} 
                            onChange={(e) => setColor(e.target.value as ColorMascota)} 
                            required
                            className="form-control"
                        >
                            <option value={ColorMascota.ORIGINAL}>Original</option>
                            {/* Opciones codificadas para el futuro pero no visibles ahora */}
                            <option value={ColorMascota.NEGRE} style={{ display: 'none' }}>Negro</option>
                            <option value={ColorMascota.TARONJA} style={{ display: 'none' }}>Naranja</option>
                            <option value={ColorMascota.BLAU} style={{ display: 'none' }}>Azul</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Crear Mascota</button>
                    {/* Botón para volver al dashboard */}
                    <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={() => navigate('/dashboard')}
                        style={{ marginLeft: '1rem' }} // Añade margen para separarlo
                    >
                        Tornar enrere
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CrearMascota;
