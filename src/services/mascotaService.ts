import axios from 'axios';
import { MascotaDTO } from '../types/types';

const API_URL = 'http://localhost:8080/api/users/mascotes';

export const getAllMascotesByUsuariId = async () => {
    return await axios.get<MascotaDTO[]>(`${API_URL}`);
};

export const createMascota = async (mascota: MascotaDTO) => {
    return await axios.post<MascotaDTO>(API_URL, mascota);
};

export const deleteMascota = async (mascotaId: string) => {
    return await axios.delete(`${API_URL}/${mascotaId}`);
};

// Obtener detalles de una mascota específica por ID
export const getMascotaById = async (mascotaId: string) => {
    try {
        const response = await axios.get<MascotaDTO>(`${API_URL}/${mascotaId}`);
        return response;
    } catch (error) {
        console.error('Error obteniendo los detalles de la mascota:', error);
        throw error;
    }
};

// Actualizar los detalles de una mascota
export const updateMascota = async (mascota: MascotaDTO) => {
    if (!mascota.id) throw new Error('La mascota debe tener un ID para ser actualizada.');
    return await axios.put<MascotaDTO>(`${API_URL}/${mascota.id}`, mascota);
};
