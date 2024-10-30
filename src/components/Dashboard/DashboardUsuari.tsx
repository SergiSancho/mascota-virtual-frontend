// DashboardUsuari.tsx
import React, { useEffect, useState } from 'react';
import MascotaCard from './MascotaCard';
import MascotaDetall from './MascotaDetall';
import { getAllMascotesByUsuariId, deleteMascota } from '../../services/mascotaService';
import { isAuthenticated, logoutUser, getUserName } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { MascotaDTO } from '../../types/types';

const DashboardUsuari: React.FC = () => {
    const [mascotes, setMascotes] = useState<MascotaDTO[]>([]);
    const [selectedMascota, setSelectedMascota] = useState<MascotaDTO | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthAndFetchMascotes = async () => {
            if (!isAuthenticated()) {
                navigate('/login');
                return;
            }

            try {
                setUsername(getUserName());
                await fetchMascotes();
            } catch (err) {
                setError('No hay mascotas disponibles.');
            } finally {
                setLoading(false);
            }
        };

        checkAuthAndFetchMascotes();
    }, [navigate]);

    const fetchMascotes = async () => {
        try {
            const response = await getAllMascotesByUsuariId();
            setMascotes(response.data);
        } catch (error) {
            console.error('Error obteniendo las mascotas:', error);
            throw error;
        }
    };

    const handleSelectMascota = (mascota: MascotaDTO) => {
        navigate(`/mascota-detall/${mascota.id}`);
    };
    

    const handleDeleteMascota = async (mascotaId: string) => {
        try {
            await deleteMascota(mascotaId);
            fetchMascotes();
        } catch (error) {
            console.error('Error eliminando la mascota:', error);
            setError('Error al eliminar la mascota. Intenta de nuevo más tarde.');
        }
    };

    const handleCreateMascota = () => {
        navigate('/crear-mascota');
    };

    const handleLogout = () => {
        logoutUser();
        navigate('/');
    };


  
    return (
        <div className="container" style={{ backgroundImage: 'url("/assets/dashboard.jpg")', backgroundSize: 'cover' }}>
            <header className="my-4">
                <h2
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo negro semitransparente
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        display: 'inline-block', // Mantener el fondo justo detrás del texto
                    }}
                >
                    Benvingut/da, {username}
                </h2>
                <div className="text-center mt-2">
                    <button onClick={handleLogout} className="btn btn-danger">Tancar Sessió</button>
                </div>
            </header>
            <section className="my-4">
   <h3>Les teves Mascotes</h3>
   <button onClick={handleCreateMascota} className="btn btn-primary mb-3">Crear Nova Mascota</button>
   {loading ? (
       <p>Cargando mascotas...</p>
   ) : error ? (
       <p className="text-danger">{error}</p>
   ) : (
       <div className="row">
           {mascotes.map(mascota => (
               <div className="col-md-4 mb-3" key={mascota.id}>
                   <MascotaCard
                       mascota={mascota}
                       onSelect={() => handleSelectMascota(mascota)}
                       onDelete={() => handleDeleteMascota(mascota.id!)}
                   />
               </div>
           ))}
       </div>
   )}
</section>

        </div>
    );
};
  
  export default DashboardUsuari;
  
