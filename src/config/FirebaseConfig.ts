import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';

const config = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Version 8
// const classicFirebaseApp = firebase.initializeApp(config);
// const auth = classicFirebaseApp.auth();
// const firestore = classicFirebaseApp.firestore();
// const storage = classicFirebaseApp.storage();

// Version 9
const firebaseApp = initializeApp(config);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const firebaseConfig = {
  auth,
  firestore,
  storage,
};

// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }

// export default firebase;
export default firebaseConfig;
