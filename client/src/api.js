import firebase from 'firebase/compat/app'

const url = 'http://localhost:5000/api/'

export const getScenarios = async () => {
    const res = await fetch(url + 'scenarios')
    return await res.json()
}

export const getSettings = async () => {
    const token = await firebase.auth().currentUser.getIdToken()
    const res = await fetch(url + 'settings', {
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
    fetch(url + 'settings', {
        method: 'POST',
        headers: {
            'authtoken': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
    })
}

export const getRuns = async (params = '') => {
    const token = await firebase.auth().currentUser.getIdToken()
    const res = await fetch(url + 'runs' + params, {
        headers: { 'authtoken': token },
    })
    return await res.json()
}

export const postRun = async (run) => {
    const token = await firebase.auth().currentUser.getIdToken()
    fetch(url + 'runs', {
        method: 'POST',
        headers: {
            'authtoken': token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(run),
    })
}

export const postUser = async () => {
    const token = await firebase.auth().currentUser.getIdToken()
    fetch(url + 'user', {
        method: 'POST',
        headers: {
            'authtoken': token,
        },
    })
}

firebase.initializeApp({
    apiKey: "AIzaSyCxxrn9A7E1arCCCXxKAAEiip3dRt_1wag",
    authDomain: "aimbox-c54d0.firebaseapp.com",
    projectId: "aimbox-c54d0",
    storageBucket: "aimbox-c54d0.appspot.com",
    messagingSenderId: "725744630197",
    appId: "1:725744630197:web:824544a5ea34329c1a81fc",
    measurementId: "G-J5K29S76G8"
})