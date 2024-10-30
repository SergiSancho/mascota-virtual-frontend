// src/assets/mascotaIcons.ts

// Importamos las imágenes directamente en la parte superior del archivo
import collieFamelic from './icons/collie_famelic_image.png';
import collieTrist from './icons/collie_trist_image.png';
import collieEnsopit from './icons/collie_ensopit_image.png';
import collieBe from './icons/collie_be_image.png';
import collieAtope from './icons/collie_atope_image.png';

import huskyFamelic from './icons/husky_famelic_image.png';
import huskyTrist from './icons/husky_trist_image.png';
import huskyEnsopit from './icons/husky_ensopit_image.png';
import huskyBe from './icons/husky_be_image.svg';
import huskyAtope from './icons/husky_atope_image.png';

import beagleFamelic from './icons/beagle_famelic_image.png';
import beagleTrist from './icons/beagle_trist_image.png';
import beagleEnsopit from './icons/beagle_ensopit_image.png';
import beagleBe from './icons/beagle_be_image.png';
import beagleAtope from './icons/beagle_atope_image.png';

import carliFamelic from './icons/carli_famelic_image.png';
import carliTrist from './icons/carli_trist_image.png';
import carliEnsopit from './icons/carli_ensopit_image.png';
import carliBe from './icons/carli_be_image.png';
import carliAtope from './icons/carli_atope_image.png';

// Creamos el objeto `mascotaIcons` con las claves y las rutas ya importadas
const mascotaIcons: { [key: string]: string } = {
    'COLLIE_FAMELIC': collieFamelic,
    'COLLIE_TRIST': collieTrist,
    'COLLIE_ENSOPIT': collieEnsopit,
    'COLLIE_BE': collieBe,
    'COLLIE_ATOPE': collieAtope,

    'HUSKY_FAMELIC': huskyFamelic,
    'HUSKY_TRIST': huskyTrist,
    'HUSKY_ENSOPIT': huskyEnsopit,
    'HUSKY_BE': huskyBe,
    'HUSKY_ATOPE': huskyAtope,

    'BEAGLE_FAMELIC': beagleFamelic,
    'BEAGLE_TRIST': beagleTrist,
    'BEAGLE_ENSOPIT': beagleEnsopit,
    'BEAGLE_BE': beagleBe,
    'BEAGLE_ATOPE': beagleAtope,

    'CARLI_FAMELIC': carliFamelic,
    'CARLI_TRIST': carliTrist,
    'CARLI_ENSOPIT': carliEnsopit,
    'CARLI_BE': carliBe,
    'CARLI_ATOPE': carliAtope,
};

export default mascotaIcons;
