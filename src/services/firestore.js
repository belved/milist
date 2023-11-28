import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

let db = false;

export const getDb = () => {
    if(!db){
      const firebaseConfig = {
        apiKey: "AIzaSyDmd9YgrE_KNm3mKjRrBVWMlwWfZs3rRGQ",
        authDomain: "milist-d7023.firebaseapp.com",
        projectId: "milist-d7023",
        storageBucket: "milist-d7023.appspot.com",
        messagingSenderId: "1001957506825",
        appId: "1:1001957506825:web:6af547ecb6646a3daaddd8",
        measurementId: "G-LGLT5C5CDK"
      };

        const app = initializeApp(firebaseConfig)

        db = getFirestore(app)
    }

    return db
}