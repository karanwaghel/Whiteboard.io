import { db } from "../config/firebase";
import {doc,setDoc,serverTimestamp} from "firebase/firestore";

const AddBoard = async (uid, elements, canvacolor) => {
  try {
     setDoc(doc(db, "boards",uid), {
      uid,
      elements,
      canvacolor,
      createdAt:serverTimestamp(),
    });
  } catch (e) {
    console.log("Problem in saving the data!!",e)
  }
};

export default AddBoard;