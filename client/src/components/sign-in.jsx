import React, { useEffect, useRef } from 'react';
import firebase from 'firebase/compat/app'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import './sign-in.css'

const firebaseConfig = {
    apiKey: "AIzaSyCxxrn9A7E1arCCCXxKAAEiip3dRt_1wag",
    authDomain: "aimbox-c54d0.firebaseapp.com",
    projectId: "aimbox-c54d0",
    storageBucket: "aimbox-c54d0.appspot.com",
    messagingSenderId: "725744630197",
    appId: "1:725744630197:web:824544a5ea34329c1a81fc",
    measurementId: "G-J5K29S76G8"
}
firebase.initializeApp(firebaseConfig)

const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
        signInSuccessWithAuthResult: () => false,
    },
}

const postUser = async () => {
    const token = await firebase.auth().currentUser.getIdToken()
    fetch('http://localhost:5000/api/user', {
        method: 'POST',
        headers: {
            'authtoken': token,
        },
    })
}

const SignInComponent = ({ userSignedIn, setUserSignedIn }) => {
    const widgetRef = useRef(null);

    useEffect(() => {
        // https://github.com/firebase/firebaseui-web-react/pull/173#issuecomment-1151532176
        // Get or Create a firebaseUI instance.
        const firebaseUiWidget = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
        if (uiConfig.signInFlow === 'popup')
            firebaseUiWidget.reset()

        // We track the auth state to reset firebaseUi if the user signs out.
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
            if (!user && userSignedIn)
                firebaseUiWidget.reset()
            setUserSignedIn(!!user)
        })

        if (userSignedIn) {
            postUser()
        } else {
            // Render the firebaseUi Widget.
            firebaseUiWidget.start(widgetRef.current, uiConfig)
        }

        return () => {
            unregisterAuthObserver()
            firebaseUiWidget.reset()
        }
    }, [userSignedIn, firebaseui, uiConfig])


    if (userSignedIn) {
        return (
            <li>
                <a href="#">{firebase.auth().currentUser.displayName}</a>
                <ul><li><a onClick={() => firebase.auth().signOut()}>Sign Out</a></li></ul>
            </li>
        )
    } else {
        return (
            <li>
                <a href="#">Sign In</a>
                <ul><li><div className="auth-widget-container" ref={widgetRef} /></li></ul>
            </li>
        )
    }
}

export default SignInComponent