// Importa la función `initializeApp` desde el SDK de Firebase para inicializar la app
import { initializeApp } from "firebase/app";

// Importa la función `getFirestore` desde Firebase Firestore para acceder a la base de datos Firestore
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase con las credenciales del proyecto
// Aquí se especifican claves de acceso, dominios, IDs del proyecto y otros parámetros necesarios
// para la autenticación y comunicación con los servicios de Firebase.
const firebaseConfig = {
  apiKey: "AIzaSyBUohmPz1k7GpmXm068SkzpyzdIOiLTDgM",  // Clave de API para acceder a Firebase
  authDomain: "document-scan-c783d.firebaseapp.com",  // Dominio autorizado para la autenticación
  projectId: "document-scan-c783d",                   // ID del proyecto de Firebase
  storageBucket: "document-scan-c783d.appspot.com",   // URL del bucket de almacenamiento de Firebase
  messagingSenderId: "260141050519",                  // ID del remitente de mensajes para Firebase Cloud Messaging
  appId: "1:260141050519:web:b3ee34adb3ea531a8a17d2"  // ID único de la app en Firebase
};

// Inicializa la aplicación de Firebase con la configuración proporcionada
const firebaseApp = initializeApp(firebaseConfig);

// Exporta la instancia de Firestore, que se utilizará para interactuar con la base de datos
export const db = getFirestore(firebaseApp);

// Exporta la aplicación de Firebase para su uso en otros módulos del proyecto
export default firebaseApp;
