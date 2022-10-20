import React, { useState } from 'react'
import SignInComponent from './components/sign-in'
import SettingsComponent from './components/settings'

const App = () => {
    const [userSignedIn, setUserSignedIn] = useState(false)
    const [showSettings, setShowSettings] = useState(false)

    const toggleSettings = () => { setShowSettings(!showSettings) }

    return (
        <header>
            <nav>
                <a href="/"><h1>AimBox</h1></a>
                <ul>
                    {userSignedIn ? <li><a onClick={toggleSettings}>Settings</a></li> : null}
                    <SignInComponent userSignedIn={userSignedIn} setUserSignedIn={setUserSignedIn} />
                </ul>
            </nav>
            {(userSignedIn && showSettings) ? <SettingsComponent /> : null}
        </header>
    )
}

export default App