// Importamos la referencia a la base de datos de Firestore desde las credenciales de Firebase.
import { db } from "../firebase/credenciales";

// Importamos las funciones necesarias de Firebase: 'collection' para obtener la referencia a una colección, 
// y 'addDoc' para agregar un nuevo documento a la colección.
import { collection, addDoc } from "firebase/firestore";

// Definimos una función asíncrona llamada 'register' que recibe 'data' como parámetro.
// 'data' será el objeto que queremos almacenar en Firestore.
export default async function register(data) {
    try {
        // Obtenemos una referencia a la colección 'registers' dentro de la base de datos.
        const collectionRef = collection(db, 'registers');
        
        // Usamos 'addDoc' para agregar un nuevo documento a la colección 'registers'.
        // La función devuelve una promesa que se resuelve con el ID del documento agregado.
        const registersId = await addDoc(collectionRef, data);
        
        // Imprimimos en consola el ID del documento que acaba de ser agregado.
        console.log(registersId);
    } catch (error) {
        // Si ocurre un error durante el proceso, lo capturamos y lo mostramos en consola.
        console.log(error);
    }
}
