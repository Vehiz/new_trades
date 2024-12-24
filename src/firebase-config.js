import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDfaVINkwVUCBEYT0xKE_d0Bo2kDY2r8XM",
  authDomain: "blockmine-ba576.firebaseapp.com",
  projectId: "blockmine-ba576",
  storageBucket: "blockmine-ba576.appspot.com",
  messagingSenderId: "656109139867",
  appId: "1:656109139867:web:5e93891527e140c3f9933e",
  measurementId: "G-97MFC8T7FW"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage();

export const auth = getAuth(app);


export const db = getFirestore(app);