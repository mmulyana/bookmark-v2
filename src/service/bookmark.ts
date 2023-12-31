import {
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

export type BookmarkRequest = Omit<Bookmark, 'id'>

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

export async function updateBookmarkDB(
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

export async function deleteBookmarkDB(id: string): Promise<boolean> {
  try {
    const ref = doc(db, DOCS.DATA, id)
    await deleteDoc(ref)
    return true
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

export async function handleFavoriteBookmarkDB(
  id: string,
  value: boolean
): Promise<boolean> {
  try {
    const ref = doc(db, DOCS.DATA, id)
    const data: Pick<Bookmark, 'isFavorite'> = {
      isFavorite: value,
    }
    await updateDoc(ref, data)
    return true
  } catch (error) {
    return false
  }
}

export async function handleArchiveBookmarkDB(
  id: string,
  value: boolean
): Promise<boolean> {
  try {
    const ref = doc(db, DOCS.DATA, id)
    const data: Pick<Bookmark, 'isArchive'> = {
      isArchive: value,
    }
    await updateDoc(ref, data)
    return true
  } catch (error) {
    return false
  }
}
