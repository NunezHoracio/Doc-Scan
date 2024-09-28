// Importamos las referencias necesarias de Firebase Firestore
import { db } from '../firebase/credenciales';  // 'db' es la referencia a la base de datos Firestore
import { collection, getDocs } from 'firebase/firestore';  // 'collection' para obtener una referencia a una colección, 'getDocs' para obtener documentos

// Función asincrónica que obtiene todos los registros de la colección 'registers' en Firestore
export default async function getRegisters() {
  try {
    // Obtenemos una referencia a la colección 'registers' dentro de la base de datos 'db'
    const collectionRef = collection(db, 'registers');

    // Usamos 'getDocs' para obtener todos los documentos de la colección
    const documents = await getDocs(collectionRef);

    // Mapeamos los documentos obtenidos para estructurar sus datos
    const docsData = documents.docs.map(d => ({
      id: d.id,         // Incluimos el ID único de cada documento
      ...d.data()       // Incluimos el resto de los datos del documento
    }));

    // Retornamos la lista de registros con sus respectivos datos
    return docsData;
  } catch (error) {
    // En caso de error, lo mostramos en la consola
    console.log(error);
  }
}
