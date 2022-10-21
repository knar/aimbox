import React, { useState } from 'react'
import ScenariosComponent from './components/scenarios'
import SettingsComponent from './components/settings'
import SignInComponent from './components/sign-in'

const App = () => {
    const [userSignedIn, setUserSignedIn] = useState(false)
    const [selectedPage, setSelectedPage] = useState('scenarios')

    const onScenarios = () => { setSelectedPage('scenarios') }
    const onSettings = () => { setSelectedPage('settings') }

    const page = {
        'scenarios': <ScenariosComponent />,
        'settings': userSignedIn ? <SettingsComponent /> : null
    }

    return (
        <header>
            <nav>
                <a href="/"><h1>AimBox</h1></a>
                <ul>
                    <li><a href="#" onClick={onScenarios}>Scenarios</a></li>

                    {userSignedIn ? <li><a href="#" onClick={onSettings}>Settings</a></li> : null}

                    <SignInComponent
                        userSignedIn={userSignedIn}
                        setUserSignedIn={setUserSignedIn}
                    />
                </ul>
            </nav>

            {page[selectedPage]}
        </header>
    )
}

export default App