import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCu_QygRjtRxdT4KKI6_WQrH8L-bvMTbKM",
    authDomain: "pawmatch-4e27d.firebaseapp.com",
    projectId: "pawmatch-4e27d",
    storageBucket: "pawmatch-4e27d.firebasestorage.app",
    messagingSenderId: "521397053344",
    appId: "1:521397053344:web:1e33f75a343469838366c5",
    measurementId: "G-BNELMWTGHS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);