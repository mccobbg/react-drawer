/* eslint-disable @typescript-eslint/no-explicit-any */
import firebase from '../config/FirebaseConfig';
import { UserCredential } from 'firebase/auth';
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
} from 'firebase/auth';

const auth = firebase.auth;

const registerUser = async (
  email: string,
  password: string,
): Promise<UserCredential> => {
  const userCredential: UserCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  await sendEmailVerification(auth.currentUser || userCredential.user);
  /*
   * @example
   * ```javascript
   * const actionCodeSettings = {
   *   url: `https://boxdrawer.io/?email=${email}`,
   *   iOS: {
   *      bundleId: 'com.example.ios'
   *   },
   *   android: {
   *     packageName: 'com.example.android',
   *     installApp: true,
   *     minimumVersion: '12'
   *   },
   *   handleCodeInApp: true
   * };
   * await sendEmailVerification(user, actionCodeSettings);
   * // Obtain code from the user.
   * await applyActionCode(auth, code);
   */
  return userCredential;
};

const loginUser = async (
  email: string,
  password: string,
): Promise<UserCredential> => {
  await setPersistence(auth, browserSessionPersistence);
  return signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = (): Promise<void> => {
  return auth.signOut();
};

const loginWithGoogle = (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

const subscribeToAuthChanges = (handleAuthChange: (user: any) => void) => {
  onAuthStateChanged(auth, (user: any) => {
    handleAuthChange(user);
  });
};

const sendResetPasswordEmail = async (email: string): Promise<boolean> => {
  const signInMethods: string[] = await fetchSignInMethodsForEmail(auth, email);
  if (signInMethods && signInMethods.length > 0) {
    sendPasswordResetEmail(auth, email);
    return true;
  }
  return false;
};

const FirebaseAuthService = {
  registerUser,
  loginUser,
  logoutUser,
  sendResetPasswordEmail,
  loginWithGoogle,
  subscribeToAuthChanges,
};

export default FirebaseAuthService;
