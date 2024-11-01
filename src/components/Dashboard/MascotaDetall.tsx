import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MascotaDTO, EntornMascota, AccioMascota, TipusMascota } from '../../types/types';
import { getMascotaById, updateMascota } from '../../services/mascotaService';
import mascotaIcons from '../../assets/mascotaIcons';
import './MascotaDetall.css';

const MascotaDetall: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mascota, setMascota] = useState<MascotaDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [nuevoEntorn, setNuevoEntorn] = useState<EntornMascota>(EntornMascota.CASA);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [showGif, setShowGif] = useState<boolean>(false);

  useEffect(() => {
    const fetchMascota = async () => {
      try {
        const response = await getMascotaById(id!);
        setMascota(response.data);
      } catch (error) {
        console.error('Error obteniendo los detalles de la mascota:', error);
        setError('Error al cargar los detalles de la mascota.');
      } finally {
        setLoading(false);
      }
    };
    fetchMascota();
  }, [id]);

  const handleUpdate = async (accion: AccioMascota) => {
    if (mascota) {
      const updatedMascota = {
        ...mascota,
        accio: accion,
        nouEntorn: accion === AccioMascota.CANVI_ENTORN ? nuevoEntorn : mascota.entorn,
      };

      await updateMascota(updatedMascota);
      alert(`Acción ${accion} realizada correctamente!`);

      const updatedResponse = await getMascotaById(id!);
      setMascota(updatedResponse.data);

      const tipoMascota = (mascota.tipus || TipusMascota.COLLIE).toLowerCase();
      const gifBaseName = accion === AccioMascota.CANVI_ENTORN
        ? `${tipoMascota}_${nuevoEntorn.toLowerCase()}`
        : `${tipoMascota}_${accion.toLowerCase()}`;

      const gifExtension = 
        accion === AccioMascota.ALIMENTAR && (tipoMascota === 'beagle' || tipoMascota === 'husky')
          ? '.webp'
          : (tipoMascota === 'carli' || tipoMascota === 'husky') && nuevoEntorn === EntornMascota.PLATJA
            ? '.webp'
            : '.gif';

      const gifUrl = `/assets/gifs/${gifBaseName}${gifExtension}`;
      setGifUrl(gifUrl);
      setShowGif(true);

      setTimeout(() => {
        setShowGif(false);
        setGifUrl(null);
      }, 5000);
    }
  };

  if (loading) return <p>Cargando detalles de la mascota...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!mascota) return null;

  const backgroundImages: { [key in EntornMascota]: string } = {
    [EntornMascota.CASA]: 'url(/assets/entorns/casa.webp)',
    [EntornMascota.PLATJA]: 'url(/assets/entorns/platja.webp)',
    [EntornMascota.PRADERA]: 'url(/assets/entorns/pradera.webp)',
    [EntornMascota.MUNTANYA]: 'url(/assets/entorns/muntanya.webp)',
    [EntornMascota.NEU]: 'url(/assets/entorns/neu.webp)',
    [EntornMascota.PIPICAN]: 'url(/assets/entorns/pipican.webp)',
  };

  const currentBackgroundImage = mascota.entorn
    ? backgroundImages[mascota.entorn]
    : backgroundImages[EntornMascota.CASA];

  return (
    <div className="mascota-detall">
      <div className="mascota-main">
        <div className="mascota-info">
          <div className="mascota-icon">
            <img
              src={mascotaIcons[`${mascota.tipus}_${mascota.estat}`]}
              alt={mascota.nom}
              className="mascota-detail-image"
            />
            <h2 className="mascota-nom">{mascota.nom}</h2>
          </div>
          <div className="mascota-details">
            <p><strong>Tipus:</strong> {mascota.tipus}</p>
            <p><strong>Color:</strong> {mascota.color}</p>
            <p><strong>Energia:</strong> {mascota.energia}</p>
            <div className="barra">
              <div className="barra-nivel" style={{ width: `${mascota.energia}%` }}></div>
            </div>
            <p><strong>Ànim:</strong> {mascota.anim}</p>
            <div className="barra">
              <div className="barra-nivel" style={{ width: `${mascota.anim}%` }}></div>
            </div>
            <p><strong>Estat:</strong> {mascota.estat}</p>
          </div>
        </div>
        <div
  className="mascota-background"
  style={{
    backgroundImage: `${currentBackgroundImage}, url('/assets/entorns/entorn.png')`,
    backgroundSize: '90%, 40%',
    backgroundPosition: 'center, center',
    backgroundRepeat: 'no-repeat, repeat'
  }}
></div>


      </div>
      <div className="mascota-actions">
        <button onClick={() => handleUpdate(AccioMascota.JUGAR)} className="btn btn-primary action-button">
          Jugar
        </button>
        <button onClick={() => handleUpdate(AccioMascota.ALIMENTAR)} className="btn btn-warning action-button">
          Alimentar
        </button>
        <button onClick={() => handleUpdate(AccioMascota.MIMS)} className="btn btn-success action-button">
          Donar Mims
        </button>
        <div className="select-container">
          <select
            onChange={(e) => setNuevoEntorn(e.target.value as EntornMascota)}
            className="form-select"
          >
            <option value={EntornMascota.CASA}>Casa</option>
            <option value={EntornMascota.PLATJA}>Platja</option>
            <option value={EntornMascota.PRADERA}>Pradera</option>
            <option value={EntornMascota.MUNTANYA}>Muntanya</option>
            <option value={EntornMascota.NEU}>Neu</option>
            <option value={EntornMascota.PIPICAN}>Pipicán</option>
          </select>
          <button onClick={() => handleUpdate(AccioMascota.CANVI_ENTORN)} className="btn btn-info">
            Canviar Entorn
          </button>
        </div>
        <button onClick={() => window.history.back()} className="btn btn-secondary action-button">
          Tornar enrere
        </button>
      </div>

      {/* Mostrar GIF y fondo negro */}
      {showGif && (
        <div className="overlay-blackout">
          <div className="gif-container">
            <img 
              src={gifUrl || ''} 
              alt="Acció Mascota" 
              className="gif" 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MascotaDetall;
