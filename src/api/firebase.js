import { initializeApp } from 'firebase/app';
import { getDatabase, ref, child, get } from 'firebase/database'
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpPQSagwFMmicy01knrqNpo-CSaY5N18Y",
  authDomain: "jioshoppy-37865.firebaseapp.com",
  databaseURL: "https://jioshoppy-37865-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jioshoppy-37865",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();
const provider = new GithubAuthProvider();

/**
 * handle log-in
 * @param callback
 */
export async function login() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      return result.user;
    }).catch((error) => {
      console.log('An error happened', error.code, error.message);
  });
}

/**
 * handle log-out
 * @param callback
 */
export async function logout() {
  signOut(auth).then(() => {
    return null;
  }).catch((error) => {
    console.log('An error happened', error.code, error.message);
  });
}

/**
 * Observer change authentication state.
 * @param callback
 */
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async user => {
    const updatedUser = user ? await adminUser(user) : null
    callback(updatedUser);
  });
}

/**
 *
 * @param uid
 * @returns {Promise<DataSnapshot>}
 */
async function adminUser(user) {
  const dbRef = ref(db);
  return get(child(dbRef, '/admins'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const isAdmin = snapshot.val().includes(user.uid);
        return {...user, isAdmin}
      }
      return user;
    }).catch((error) => {
      console.error(error);
    });
}
