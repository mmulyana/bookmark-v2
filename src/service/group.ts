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
import { nanoid } from 'nanoid/non-secure'
import { Group } from '../model/group'

export type groupRequest = Omit<Group, 'id'>

export async function createGroup(
  payload: groupRequest
): Promise<Group | boolean> {
  try {
    const id = nanoid()
    const ref = doc(db, DOCS.GROUP, id)
    await setDoc(ref, {
      ...payload,
    })
    return { ...payload, id }
  } catch (error) {
    return false
  }
}

export async function updateGroup(
  payload: groupRequest & { id: string }
): Promise<string | boolean> {
  try {
    const ref = doc(db, DOCS.GROUP, payload.id)

    const body = { ...payload } as Partial<groupRequest>
    delete body.uid

    await updateDoc(ref, body)
    return 'success update'
  } catch (error) {
    return false
  }
}
export async function deleteGroup({
  id,
}: {
  id: string
}): Promise<string | boolean> {
  try {
    const ref = doc(db, DOCS.GROUP, id)
    await deleteDoc(ref)
    return 'success update'
  } catch (error) {
    return false
  }
}

export async function getGroup(uid: string): Promise<Group[] | boolean> {
  try {
    const ref = query(collection(db, DOCS.GROUP), where('uid', '==', uid))
    const data = await getDocs(ref)

    if (!data) return false

    const result = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))

    return result as Group[]
  } catch (error) {
    console.log(error)
    return false
  }
}
