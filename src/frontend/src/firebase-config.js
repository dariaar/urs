import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Vaša Firebase konfiguracija
const firebaseConfig = {
  apiKey: "AIzaSyCM9ESQyuSKzuDMV_vQ0vA9keoHjfEQOkU",
  authDomain: "qrcode-63444.firebaseapp.com",
  databaseURL:
    "https://qrcode-63444-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "qrcode-63444",
  storageBucket: "qrcode-63444.firebasestorage.app",
  messagingSenderId: "288016518567",
  appId: "1:288016518567:web:7f019a353e7a81289c7a82",
};

// Inicijalizacija Firebase aplikacije
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
