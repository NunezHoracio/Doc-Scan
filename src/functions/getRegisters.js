import { db } from '../firebase/credenciales';
import { collection, getDocs } from 'firebase/firestore';

export default async function getRegisters() {
  try {
    const collectionRef = collection(db, 'registers');
    const documents = await getDocs(collectionRef);
    const docsData = documents.docs.map(d => ({
      id: d.id,         // Incluye el ID del documento
      ...d.data()       // Incluye el resto de los datos
    }));
    return docsData;
  } catch (error) {
    console.log(error);
  }
}
