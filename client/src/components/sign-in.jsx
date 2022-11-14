import React, { useEffect, useRef } from 'react';
import firebase from 'firebase/compat/app'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import './sign-in.css'
import { postUser } from '../api'

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

const SignIn = ({ userSignedIn, setUserSignedIn }) => {
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
                <a onClick={() => firebase.auth().signOut()}>Sign Out</a>
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

export default SignIn