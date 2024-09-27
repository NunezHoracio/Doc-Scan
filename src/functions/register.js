import { db } from "../firebase/credenciales";
import { collection, addDoc } from "firebase/firestore";

export default async function register(data){
    try {
        const collectionRef = collection(db, 'registers');
        const registersId = await addDoc(collectionRef, data);
        console.log(registersId);
    } catch (error){
        console.log(error);
    }
}
