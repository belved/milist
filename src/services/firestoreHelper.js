import { getDocs, setDoc, deleteDoc, collection, doc } from "firebase/firestore"; 
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

export const deleteSong = async (id) => {
    try {
        await deleteDoc(doc(getDb(), "songs", id));
        console.log('Document supprimé avec succès');
    } catch (error) {
        console.error('Erreur lors de la suppression du document : ', error);
    }
}

export const updateSong = async (id, song) => {
    await setDoc(doc(getDb(), "songs", id), song);
}