"Más enseña el desengaño que el consejo"  
Los errores o aciertos en este trabajo no son únicamente de mi responsabilidad. Por momentos, mis manos fueron un ciego instrumento de la voluntad del oráculo algorítmico.


# Proyecto de Frontend para Aplicación de Mascotas Virtuales

Este repositorio contiene el frontend de la aplicación **Mascotas Virtuales**, desarrollada utilizando React con el apoyo de herramientas de IA. Este frontend está diseñado para conectarse con un backend desarrollado en Java disponible en el siguiente repositorio: [Repositorio de Backend para Mascotas Virtuales](https://github.com/SergiSancho/mascota-virtual-backend).

## Descripción del Proyecto

La aplicación **Mascotas Virtuales** permite a los usuarios crear y cuidar mascotas virtuales, ofreciéndoles una experiencia interactiva y personalizada. Incluye funcionalidades de registro, inicio de sesión, creación, visualización, actualización y eliminación de mascotas. Los usuarios pueden elegir entre diversas criaturas (como dragones, unicornios y extraterrestres) y personalizar tanto su apariencia como sus características.

### Características

- **Registrar (Register):** Permite a los usuarios crear una cuenta con nombre de usuario y contraseña.
- **Iniciar sesión (Login):** Los usuarios pueden iniciar sesión con sus credenciales para recibir un token JWT.
- **Crear (Create):** Los usuarios crean mascotas virtuales y personalizan su apariencia.
- **Leer (Read):** Visualización de las mascotas en un entorno virtual colorido.
- **Actualizar (Update):** Los usuarios pueden interactuar con sus mascotas (alimentarlas, jugar, comprar accesorios).
- **Eliminar (Delete):** Permite eliminar mascotas que ya no desean cuidar.

### Implementación de Roles

- **Usuarios (ROLE_USER):** Pueden acceder solo a sus propias mascotas.
- **Administradores (ROLE_ADMIN):** Pueden acceder a todas las mascotas del sistema.

### Middleware de Autorización

Se ha implementado un middleware de autorización que verifica los permisos de los usuarios antes de acceder a recursos protegidos.

## Documentación de la IA Utilizada y Proceso de Desarrollo

Para desarrollar el frontend de esta aplicación se utilizó **ChatGPT** de OpenAI. Esta IA fue seleccionada debido a su capacidad para generar código de forma rápida y detallada, comparándola con otras opciones como Copilot. La elección se basó en la claridad de sus respuestas y la facilidad para ajustar el código generado. Además, se solicitó ayuda en generación de imágenes utilizando DALL·E para añadir elementos visuales al proyecto.

**Registro de Interacciones:** Durante el proceso se realizaron múltiples iteraciones y ajustes de las preguntas a la IA para obtener un código funcional. Este diálogo y las aclaraciones obtenidas contribuyeron a mejorar la calidad del proyecto.

**Análisis del Código Generado:** La mayor parte del código generado se obtuvo mediante cortes y ajustes iterativos en las respuestas de la IA. Para adaptar el código a los requisitos específicos, fue necesario realizar ajustes manuales, obtener aclaraciones continuas y añadir comentarios descriptivos al código.

**Conexión Frontend-Backend:** La conexión entre el frontend y el backend fue gestionada también mediante la ayuda de la IA. En el backend, se implementó CORS adecuadamente debido a su configuración específica con WebFlux, y en el frontend se utilizó Axios para gestionar las peticiones.

**Reflexión sobre el Proceso de Aprendizaje:** Este proceso fue una experiencia de aprendizaje exhaustiva. La habilidad principal desarrollada fue la paciencia y la reformulación de preguntas para obtener respuestas claras. Fue sorprendente conseguir que el frontend se conectara al backend funcionalmente, aunque la comprensión de React y TypeScript fue limitada en este caso.

### Presentación Documentada

La presentación del proyecto, que contiene una explicación detallada de cada fase del desarrollo, se encuentra en Gamma y puede accederse a través del siguiente enlace:

[Presentación en Gamma - IA en el Desarrollo de Frontend para Mascotas Virtuales](https://gamma.app/docs/IA-en-el-Desarrollo-de-Frontend-para-Mascotas-Virtuales-ymwd8052slokqig)

## Estructura del Proyecto

Este proyecto fue inicializado con [Create React App](https://github.com/facebook/create-react-app).

### Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

- **`npm start`**: Inicia la aplicación en modo de desarrollo en [http://localhost:3000](http://localhost:3000).
- **`npm test`**: Ejecuta el test runner en modo interactivo.
- **`npm run build`**: Genera la aplicación optimizada para producción en la carpeta `build`.
- **`npm run eject`**: Remueve la dependencia única de Create React App para un control completo del proyecto.

Para más información sobre comandos adicionales, consulta la documentación de [Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

