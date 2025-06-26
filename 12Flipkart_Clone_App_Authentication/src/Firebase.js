import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCo91CZWS4wYykjC3s8ka6-VwDUf55jMQI",
  authDomain: "flipkart-clone-app-firebase.firebaseapp.com",
  projectId: "flipkart-clone-app-firebase",
  storageBucket: "flipkart-clone-app-firebase.appspot.com",
  messagingSenderId: "749862275969",
  appId: "1:749862275969:web:ec972893ffde7d1baa7680"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);