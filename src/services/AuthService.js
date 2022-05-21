import {
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebase/config';

class AuthService {
  async authWithGoogle() {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(auth, provider);
  }

  async authWithGithub() {
    const provider = new GithubAuthProvider();
    return await signInWithPopup(auth, provider);
  }

  async logOut() {
    return await signOut(auth);
  }

  waitForUser(callback) {
    return onAuthStateChanged(auth, userCred => callback(userCred));
  }
}

export default new AuthService();
