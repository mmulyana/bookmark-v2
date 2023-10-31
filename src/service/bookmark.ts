import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from './firebase'
import { DOCS } from '../constants/collection'
import { nanoid } from 'nanoid'
import { Bookmark } from '../model/bookmark'

export type BookmarkRequest = {
  uid: string
  link: string
  name: string
  group: string
  description?: string
}

export async function createBookmark(
  payload: BookmarkRequest
): Promise<Bookmark | boolean> {
  try {
    const id = nanoid()
    const ref = doc(db, DOCS.DATA, id)
    await setDoc(ref, {
      ...payload,
    })
    return { ...payload, id }
  } catch (error) {
    return false
  }
}

export async function updateBookmark(
  payload: BookmarkRequest
): Promise<string | boolean> {
  try {
    const ref = doc(db, DOCS.USER, payload.uid)

    const body = { ...payload } as Partial<BookmarkRequest>
    delete body.uid

    await updateDoc(ref, body)
    return 'success update'
  } catch (error) {
    return false
  }
}

export async function deleteBookmark({
  uid,
}: {
  uid: string
}): Promise<string | boolean> {
  try {
    const ref = doc(db, DOCS.USER, uid)
    await deleteDoc(ref)
    return 'success update'
  } catch (error) {
    return false
  }
}

export async function getBookmark(uid: string): Promise<Bookmark[] | boolean> {
  try {
    const ref = query(collection(db, DOCS.DATA), where('uid', '==', uid))
    const data = await getDocs(ref)

    if (!data) return false

    const result = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))

    return result as Bookmark[]
  } catch (error) {
    console.log(error)
    return false
  }
}
