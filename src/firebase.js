import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Initialize authentication
import { getAnalytics } from "firebase/analytics"; // Initialize analytics (if needed)

const firebaseConfig = {
  apiKey: "AIzaSyCLYIbI4NmZ1oU42LI103wBr1EEJ4bDHjY",
  authDomain: "hireme-9b46b.firebaseapp.com",
  projectId: "hireme-9b46b",
  storageBucket: "hireme-9b46b.firebasestorage.app",
  messagingSenderId: "755848707643",
  appId: "1:755848707643:web:3c4e86c5c25d269d37a61e",
  measurementId: "G-XY4HLZHSFE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // Initialize Firebase Auth
const analytics = getAnalytics(app);  // Initialize Firebase Analytics

export { auth, analytics };  // Export auth for use in Login
