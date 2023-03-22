import { initializeApp } from 'firebase/app'
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth'
import { getFirestore, query, getDocs, collection, where, addDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { firebaseConfig } from '../firebase'

export const useAuthFlow = () => {
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app)
  const googleProvider = new GoogleAuthProvider()
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider)
      const user = res.user
      const q = query(collection(db, 'users'), where('uid', '==', user.uid))
      const docs = await getDocs(q)
      if (docs.docs.length === 0) {
        await addDoc(collection(db, 'users'), {
          uid: user.uid,
          name: user.displayName,
          authProvider: 'google',
          email: user.email,
        })
      }
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  }
  const logInWithEmailAndPassword = async ({ email, password }) => {
    try {
      const data = await signInWithEmailAndPassword(auth, email, password)
      if (data.user) {
        const { accessToken, email, displayName } = data.user
        authenticate({ accessToken, email, displayName })
      }
    } catch (err) {
      toast.error('Invalid Credentials !', {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  }
  const registerWithEmailAndPassword = async ({ name, email, password }) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      const user = res.user
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name,
        authProvider: 'local',
        email,
      })
    } catch (err) {
      toast.error('Invaid Email or email already exists !', {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  }
  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email)
      toast.success('Link sent !', {
        position: toast.POSITION.TOP_RIGHT,
      })
    } catch (err) {
      toast.error('User not found !', {
        position: toast.POSITION.TOP_CENTER,
      })
    }
  }
  const logout = () => {
    localStorage.removeItem('loggedInUser')
    signOut(auth)
  }

  const authenticate = (data) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('loggedInUser', JSON.stringify(data))
    }
  }
  const isAutheticated = () => {
    if (typeof window == 'undefined') {
      return false
    }
    if (localStorage.getItem('loggedInUser')) {
      return JSON.parse(localStorage.getItem('loggedInUser'))
    } else {
      return false
    }
  }

  return {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
    authenticate,
    isAutheticated,
  }
}
