// Definición del enum AccioMascota
export enum AccioMascota {
    JUGAR = 'JUGAR',
    MIMS = 'MIMS',
    ALIMENTAR = 'ALIMENTAR',
    CANVI_ENTORN = 'CANVI_ENTORN'
}

// Definición del enum ColorMascota
export enum ColorMascota {
    ORIGINAL = 'ORIGINAL',
    NEGRE = 'NEGRE',
    TARONJA = 'TARONJA',
    BLAU = 'BLAU'
}

// Definición del enum EntornMascota
export enum EntornMascota {
    CASA = 'CASA',
    PLATJA = 'PLATJA',
    PRADERA = 'PRADERA',
    MUNTANYA = 'MUNTANYA',
    NEU = 'NEU',
    PIPICAN = 'PIPICAN'
}

// Definición del enum TipusMascota
export enum TipusMascota {
    COLLIE = 'COLLIE',
    HUSKY = 'HUSKY',
    BEAGLE = 'BEAGLE',
    CARLI = 'CARLI'
}

// Definición del enum EstatMascota
export enum EstatMascota {
    FAMELIC = 'FAMELIC',
    TRIST = 'TRIST',
    ENSOPIT = 'ENSOPIT',
    BE = 'BE',
    ATOPE = 'ATOPE'
}

export interface MascotaDTO {
    id?: string; // Requerido obtener y actualizar
    nom?: string; // Requerido al crear 
    tipus?: TipusMascota; // Requerido al crear
    color?: ColorMascota; // Requerido al crear 
    entorn?: EntornMascota; // Devuelto al obtener
    energia?: number; // Devuelto al obtener
    anim?: number; // Devuelto al obtener
    estat?: EstatMascota; // Devuelto al obtener
    propietariId?: string; // Requerido para obtener y actualizar
    accio?: AccioMascota; // Requerido actualizar
    nouEntorn?: EntornMascota; // Requerido actualizar
}

export interface UsuariDTO {
    id: string;
    nomUsuari: string;
    rol: string;
}

// Define el tipo de datos para AuthResponse (respuesta de autenticación)
export interface AuthResponse {
    token: string;
    usuariDTO: UsuariDTO;
}
