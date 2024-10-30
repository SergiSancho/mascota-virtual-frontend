// Importa los módulos necesarios
import globals from 'globals'; // Proporciona las variables globales de diferentes entornos (como navegador)
import pluginJs from '@eslint/js'; // El plugin básico de ESLint para JavaScript
import tseslint from 'typescript-eslint'; // Permite integrar TypeScript con ESLint
import pluginReact from 'eslint-plugin-react'; // Proporciona reglas específicas para React

// Exporta la configuración de ESLint
export default [
  // Define los archivos que ESLint debe procesar
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] }, // Aplica la configuración a archivos .js, .ts, .jsx, y .tsx

  // Configuración de las opciones del lenguaje
  {
    languageOptions: {
      globals: {
        ...globals.browser, // Establece el entorno del navegador como global
      },
      parserOptions: {
        // Opciones para el parser de ESLint
        ecmaFeatures: {
          jsx: true, // Habilita el soporte para JSX
        },
        ecmaVersion: 12, // Usa la versión de ECMAScript 2021
        sourceType: 'module', // Permite el uso de módulos ES
      },
    },
  },

  // Configuración recomendada de ESLint para JavaScript
  pluginJs.configs.recommended, // Usa las reglas recomendadas del plugin de JavaScript

  // Configuración recomendada para TypeScript
  ...tseslint.configs.recommended, // Usa las reglas recomendadas del plugin de TypeScript

  // Configuración recomendada para React
  pluginReact.configs.flat.recommended, // Usa las reglas recomendadas del plugin de React

  // Agrega la configuración de la versión de React
  {
    settings: {
      react: {
        version: 'detect', // Detecta automáticamente la versión de React que estás usando
      },
    },
  },

  // Definición de reglas personalizadas
  {
    rules: {
      'react/prop-types': 'off', // Desactiva la verificación de PropTypes si no los usas
      'react/react-in-jsx-scope': 'off', // Desactiva esta regla si usas React 17 o superior
      'no-unused-vars': 'warn', // Muestra advertencias por variables no usadas
      '@typescript-eslint/no-unused-vars': ['warn'], // Muestra advertencias por variables no usadas en TypeScript
      quotes: ['error', 'single'], // Obliga a usar comillas simples en lugar de dobles
      semi: ['error', 'always'], // Obliga a usar punto y coma al final de las líneas
    },
  },
];
