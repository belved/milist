import { getDocs, setDoc, collection, doc } from "firebase/firestore"; 
import { getDb } from "./firestore.js"

export const findAll = async (collectionName) => {
    const doc_refs = await getDocs(collection(getDb(), collectionName))

    const res = []

    doc_refs.forEach(tuning => {
        res.push({
            id: tuning.id, 
            ...tuning.data()
        })
    })

    return res
}

export const addSong = async (id, song) => {
    await setDoc(doc(getDb(), "songs", id), song);
}

export const addArtist = async (id, artistName) => {
    await setDoc(doc(getDb(), "artists", id), artistName);
}

export const updateSong = async (id, song) => {
    await setDoc(doc(getDb(), "songs", id), song);
}