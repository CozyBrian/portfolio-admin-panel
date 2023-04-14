import { initializeApp } from "@firebase/app";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_APP_FIREBASE_KEY}`,
  authDomain: "my-portfolio-35b84.firebaseapp.com",
  databaseURL:
    "https://my-portfolio-35b84-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-portfolio-35b84",
  storageBucket: "my-portfolio-35b84.appspot.com",
  messagingSenderId: "870805883123",
  appId: "1:870805883123:web:c979664ed96d8331968f86",
};

const app = initializeApp(firebaseConfig);
export default app;
