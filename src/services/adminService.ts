import axios from 'axios';
import { UsuariDTO, MascotaDTO } from '../types/types';

const API_URL = 'http://localhost:8080/api/admin'; // Ajusta según el endpoint de admin en tu backend

// Obtener todos los usuarios
export const getAllUsers = async () => {
    return await axios.get<UsuariDTO[]>(`${API_URL}/users`);
};

// Obtener todas las mascotas (sin importar propietario)
export const getAllMascotes = async () => {
    return await axios.get<MascotaDTO[]>(`${API_URL}/mascotes`);
};

// Eliminar un usuario por ID
export const deleteUser = async (userId: string) => {
    return await axios.delete(`${API_URL}/users/${userId}`);
};

// Eliminar una mascota por ID (sin validar propietario)
export const deleteMascota = async (mascotaId: string) => {
    return await axios.delete(`${API_URL}/mascotes/${mascotaId}`);
};
