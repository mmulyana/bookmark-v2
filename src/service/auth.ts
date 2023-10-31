import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { auth, db } from './firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { User } from '../model/auth'
import { DOCS } from '../constants/collection'

export async function LoginWithEmail(
  email: string,
  password: string
): Promise<User | undefined> {
  try {
    const data = await signInWithEmailAndPassword(auth, email, password)
    const ref = doc(db, DOCS.USER, data.user.uid)
    const docSnapshot = await getDoc(ref)
    if (docSnapshot.exists()) {
      const res = docSnapshot.data()
      const payload = {
        uid: data.user.uid,
        name: res.name,
        email: data.user.email,
      }
      return payload as User
    } else {
      console.log('You not registered yet')
      return
    }
  } catch (error) {
    console.log(error)
    return
  }
}

export async function RegisterWithEmail(
  email: string,
  password: string,
  name: string
): Promise<boolean | void> {
  try {
    const data = await createUserWithEmailAndPassword(auth, email, password)
    await setDoc(doc(db, DOCS.USER, data.user.uid), {
      name: name,
    })
    return true
  } catch (error) {
    console.log(error)
  }
}

export async function getMe(uid: string): Promise<User | undefined> {
  try {
    const ref = doc(db, DOCS.USER, uid)
    const docSnapshot = await getDoc(ref)

    if (!docSnapshot.exists()) {
      console.log('You not registered yet')
      return
    }

    const res = docSnapshot.data()
    const payload = {
      name: res.name,
      email: res.email,
      uid: uid,
    } as User

    return payload
  } catch (error) {
    console.log(error)
    return
  }
}
