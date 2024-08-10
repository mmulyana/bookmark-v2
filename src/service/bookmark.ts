import {
  collection,
  deleteDoc,
  doc,
  DocumentSnapshot,
  getDocs,
  limit,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from './firebase'
import { DOCS } from '../constants/collection'
import { nanoid } from 'nanoid'
import { Bookmark } from '../model/bookmark'

export type BookmarkRequest = Omit<Bookmark, 'id'>
const PAGE_SIZE = 10

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

export async function getBookmark(
  uid: string,
  lastVisible?: DocumentSnapshot | null,
  size: number = PAGE_SIZE
): Promise<{
  bookmarks: Bookmark[]
  lastVisible: DocumentSnapshot | null
}> {
  try {
    let ref = query(
      collection(db, DOCS.DATA),
      where('uid', '==', uid),
      limit(size)
    )

    if (lastVisible) {
      ref = query(ref, startAfter(lastVisible))
    }

    const data = await getDocs(ref)

    if (data.empty) {
      return { bookmarks: [], lastVisible: null }
    }

    const bookmarks = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Bookmark[]

    const newLastVisible = data.docs[data.docs.length - 1]

    return {
      bookmarks,
      lastVisible: newLastVisible,
    }
  } catch (error) {
    console.error('Error fetching bookmarks:', error)
    throw error
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
