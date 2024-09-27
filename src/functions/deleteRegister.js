import { db } from '../firebase/credenciales';
import { doc, deleteDoc } from 'firebase/firestore';

async function deleteRegister(id) {
  try {
    const docRef = doc(db, 'registers', id); // Asegúrate de que 'id' es el correcto
    await deleteDoc(docRef);
    console.log(`Documento con id ${id} eliminado exitosamente.`);
  } catch (error) {
    console.error('Error al eliminar el documento:', error);
    throw error; // Lanza el error para manejarlo en el componente
  }
}

export default deleteRegister;
