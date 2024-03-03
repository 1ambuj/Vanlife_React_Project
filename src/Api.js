import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    doc,
    getDocs,
    getDoc,
    query,
    where,
    documentId
} from "firebase/firestore/lite"

const firebaseConfig = {
  apiKey: "AIzaSyBwX4ZUrrlyzI_xtKRkAYvuHBwcwtbAsHk",
  authDomain: "vanlife-20d05.firebaseapp.com",
  projectId: "vanlife-20d05",
  storageBucket: "vanlife-20d05.appspot.com",
  messagingSenderId: "41774344259",
  appId: "1:41774344259:web:56643454ff4490f63e8cf6"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Refactoring the fetching functions below
const vansCollectionRef = collection(db, "vans")

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return {
        ...snapshot.data(),
        id: snapshot.id
    }
}

export async function getHostVans() {
    const q = query(vansCollectionRef, where("hostId", "==", "123"))
    const snapshot = await getDocs(q)
    const vans = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return vans
}

// /* 
// This 👇 isn't normally something you'd need to do. Instead, you'd 
// set up Firebase security rules so only the currently logged-in user 
// could edit their vans.

// https://firebase.google.com/docs/rules

// I'm just leaving this here for educational purposes, as it took
// me a while to find the `documentId()` function that allows you
// to use a where() filter on a document's ID property. (Since normally
// it only looks at the data() properties of the document, meaning you
// can't do `where("id", "==", id))`

// It also shows how you can chain together multiple `where` filter calls
// */

// // export async function getHostVan(id) {
// //     const q = query(
// //         vansCollectionRef,
// //         where(documentId(), "==", id),
// //         where("hostId", "==", "123")
// //     )
// //     const snapshot = await getDocs(q)
// //     const vans = snapshot.docs.map(doc => ({
// //         ...doc.data(),
// //         id: doc.id
// //     }))
// //     return vans[0]
// // }

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}
// export async function getVans(id) {
//     const url = id ? `/api/vans/${id}` : "/api/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

// export async function getHostVans(id) {
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

// export async function loginUser(creds) {
//     const res = await fetch("/api/login",
//         { method: "post", body: JSON.stringify(creds) }
//     )
//     const data = await res.json()

//     if (!res.ok) {
//         throw {
//             message: data.message,
//             statusText: res.statusText,
//             status: res.status
//         }
//     }

//     return data
// }