import { createApp } from 'vue'
import App from './App.vue'

import router from './router.js';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC1w0XXB3U1jSpX-4wY26QrYX5NnWOmJdo",
    authDomain: "corporate-portal-2f043.firebaseapp.com",
    projectId: "corporate-portal-2f043",
    storageBucket: "corporate-portal-2f043.appspot.com",
    messagingSenderId: "590448188591",
    appId: "1:590448188591:web:1f3355ed94133d6243485a",
    measurementId: "G-YYNE85K34L"
};

const firebase_app = initializeApp(firebaseConfig);
export const db = getFirestore(firebase_app);


let app = createApp(App);
app.use(router);
app.mount('#app')


