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
