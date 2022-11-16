import React, { useState } from 'react'
import Scenarios from './components/scenarios'
import Runs from './components/runs'
import SettingsForm from './components/settings-form'
import SignIn from './components/sign-in'

const App = () => {
    const [userSignedIn, setUserSignedIn] = useState(false)
    const [selectedPage, setSelectedPage] = useState('scenarios')

    const onScenarios = () => { setSelectedPage('scenarios') }
    const onRuns = () => { setSelectedPage('runs') }
    const onSettings = () => { setSelectedPage('settings') }

    const page = {
        'scenarios': userSignedIn ? <Scenarios /> : null,
        'runs': userSignedIn ? <Runs /> : null,
        'settings': userSignedIn ? <SettingsForm /> : null,
    }

    return (
        <header>
            <nav>
                <a href="/"><h1>AimBox</h1></a>
                <ul>
                    {userSignedIn ? <li><a href="#" onClick={onScenarios}>Scenarios</a></li> : null}
                    {userSignedIn ? <li><a href="#" onClick={onRuns}>Runs</a></li> : null}
                    {userSignedIn ? <li><a href="#" onClick={onSettings}>Settings</a></li> : null}
                    <SignIn
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