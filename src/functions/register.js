import { db } from "../firebase/credenciales";
import { collection, addDoc } from "firebase/firestore";

export default async function register(data){
    try {
        const collectionRef = collection(db, 'registro');
        const registroId = await addDoc(collectionRef, data);
        console.log(registroId);
    } catch (error){
        console.log(error);
    }
}
