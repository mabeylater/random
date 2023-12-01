import { Injectable } from '@angular/core';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, orderBy, query, setDoc } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { BpData } from '../shared/models';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyC7rAs2gLRBfGn4A25YEN5MQA55et6Eat4",
  authDomain: "mabey-dev-random-409c1.firebaseapp.com",
  projectId: "mabey-dev-random-409c1",
  storageBucket: "mabey-dev-random-409c1.appspot.com",
  messagingSenderId: "660953380900",
  appId: "1:660953380900:web:0d605335cbe951b1c4c0b1",
  measurementId: "G-BG486VY51C"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

const bpDataPath = 'bpData'

class ApiHelper {

}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  db = getFirestore(app);

  constructor() { }

  async postBpData(item: Partial<BpData>) {
    return await addDoc(collection(this.db, bpDataPath), item)
  }

  async putBpData(item: Partial<BpData>, id: string) {
    return await setDoc(doc(this.db, bpDataPath, id), item, { merge: true })
  }

  async getBpDataById(id: string) {
    const docSnap = await getDoc(doc(this.db, bpDataPath, id));
    if(docSnap.exists()) {
      return docSnap.data() as BpData;
    }
    return null;
  }

  async getBpData() {
    const bpRef = collection(this.db, bpDataPath);
    const queryStatement = query(bpRef, orderBy("date", 'desc'));
    const querySnapShot = await getDocs(queryStatement)
    if(!querySnapShot.empty) {
      return querySnapShot
        .docs
        .map(x => { return {...(x.data() as BpData), id: x.id}})
    }
    return null;
  }
}
