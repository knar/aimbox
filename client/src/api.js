import firebase from 'firebase/compat/app'

firebase.initializeApp({
    apiKey: "AIzaSyCxxrn9A7E1arCCCXxKAAEiip3dRt_1wag",
    authDomain: "aimbox-c54d0.firebaseapp.com",
    projectId: "aimbox-c54d0",
    storageBucket: "aimbox-c54d0.appspot.com",
    messagingSenderId: "725744630197",
    appId: "1:725744630197:web:824544a5ea34329c1a81fc",
    measurementId: "G-J5K29S76G8"
})

export const postUser = async () => {
    const token = await firebase.auth().currentUser.getIdToken()
    fetch('http://localhost:5000/api/user', {
        method: 'POST',
        headers: {
            'authtoken': token,
        },
    })
}

export const getSettings = async () => {
    const token = await firebase.auth().currentUser.getIdToken()
    const res = await fetch('http://localhost:5000/api/settings', {
        headers: { 'authtoken': token },
    })

    if (!res.ok) {
        console.log('You have no settings saved yet.')
        return
    }

    return await res.json()
}

export const postSettings = async (settings) => {
    const token = await firebase.auth().currentUser.getIdToken()
    fetch('http://localhost:5000/api/settings', {
        method: 'POST',
        headers: {
            'authtoken': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
    })
}

export const getScenarios = async () => {
    const res = await fetch('http://localhost:5000/api/scenarios')
    return await res.json()
}