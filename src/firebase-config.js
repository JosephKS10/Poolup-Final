import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase} from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAYQZL4K1gh5Z8QBrObpCo4ntCeuZa0HNo",
  authDomain: "poolup-web.firebaseapp.com",
  projectId: "poolup-web",
  storageBucket: "poolup-web.appspot.com",
  messagingSenderId: "35692323355",
  appId: "1:35692323355:web:a8b9c5caa4135ba5a70ebe",
  databaseURL:"https://poolup-web-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase();
const db = getDatabase(app)
export {auth,database, db}
