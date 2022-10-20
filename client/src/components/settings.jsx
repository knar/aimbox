import React, { useState, useEffect } from 'react'
import firebase from 'firebase/compat/app'

const SettingsComponent = () => {
    const [sens, setSens] = useState(1)
    const [fov, setFov] = useState(103)

    const getSettings = async () => {
        const token = await firebase.auth().currentUser.getIdToken()
        const response = await fetch('http://localhost:5000/api/settings', {
            headers: { 'authtoken': token },
        })

        if (!response.ok) {
            console.log('You have no settings saved yet.')
            return
        }

        const { sens, fov } = await response.json()
        setSens(sens)
        setFov(fov)
    }

    const postSettings = async () => {
        const token = await firebase.auth().currentUser.getIdToken()
        fetch('http://localhost:5000/api/settings', {
            method: 'POST',
            headers: {
                'authtoken': token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sens, fov }),
        })
    }

    useEffect(() => {
        getSettings()
    }, [])

    return (
        <section>
            <form>
                <header>
                    <h2>Settings</h2>
                </header>
                <label htmlFor="sens">Sensitivity: {sens}</label>
                <input
                    name="sens"
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={sens}
                    onChange={e => setSens(e.target.value)}
                />
                <label htmlFor="fov">Field of View: {fov}</label>
                <input
                    name="fov"
                    type="range"
                    min="70"
                    max="130"
                    step="1"
                    value={fov}
                    onChange={e => setFov(e.target.value)}
                />
                <button type="button" onClick={postSettings}>Save</button>
            </form>
        </section>
    )
}

export default SettingsComponent