import { db } from '../firebase/credenciales';
import { doc, updateDoc } from 'firebase/firestore';

export default async function updateRegister(id, updatedData) {
  try {
    const docRef = doc(db, 'registers', id); // Identifica el documento por su ID
    await updateDoc(docRef, updatedData);    // Actualiza el documento con los nuevos datos
    console.log(`Documento con id ${id} actualizado exitosamente.`);
  } catch (error) {
    console.error('Error al actualizar el documento:', error);
    throw error;  // Lanza el error para manejarlo en el componente
  }
}
// Importa la base de datos Firestore desde el archivo de credenciales de Firebase
import { db } from '../firebase/credenciales';

// Importa las funciones necesarias para obtener una referencia al documento y actualizarlo
import { doc, updateDoc } from 'firebase/firestore';

// Función asincrónica para actualizar un documento en Firestore
export default async function updateRegister(id, updatedData) {
  try {
    // Crea una referencia al documento en la colección 'registers' usando su ID
    const docRef = doc(db, 'registers', id); 
    
    // Actualiza el documento en Firestore con los nuevos datos proporcionados
    await updateDoc(docRef, updatedData);
    
    // Imprime un mensaje de éxito en la consola si la actualización es exitosa
    console.log(`Documento con id ${id} actualizado exitosamente.`);
  } catch (error) {
    // Si ocurre un error, imprime un mensaje de error en la consola
    console.error('Error al actualizar el documento:', error);
    
    // Lanza el error para que sea manejado fuera de la función, si es necesario
    throw error;
  }
}
