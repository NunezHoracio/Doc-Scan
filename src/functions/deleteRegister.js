// Importa las credenciales de la base de datos Firestore y las funciones necesarias 
import { db } from '../firebase/credenciales'; 
import { doc, deleteDoc } from 'firebase/firestore';

// Función asíncrona para eliminar un documento específico en Firestore
async function deleteRegister(id) {
  try {
    // Obtiene una referencia al documento con el id proporcionado en la colección 'registers'
    const docRef = doc(db, 'registers', id); 

    // Usa la función deleteDoc para eliminar el documento referenciado
    await deleteDoc(docRef);

    // Muestra en la consola un mensaje de éxito cuando el documento es eliminado
    console.log(`Documento con id ${id} eliminado exitosamente.`);
  } catch (error) {
    // Si ocurre un error, lo muestra en la consola y lo lanza de nuevo para manejarlo en otro lugar
    console.error('Error al eliminar el documento:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
}

// Exporta la función para que pueda ser utilizada en otros componentes
export default deleteRegister;
