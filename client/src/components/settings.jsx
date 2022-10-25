import React, { useEffect, useState } from 'react'
import { getSettings, postSettings } from '../api'

const Settings = () => {
    const [settings, setSettings] = useSettings()

    const handleSensChange = event => {
        setSettings({ ...settings, sens: event.target.value })
    }

    const handleFovChange = event => {
        setSettings({ ...settings, fov: event.target.value })
    }

    const handleWallColorChange = event => {
        setSettings({ ...settings, wallColor: event.target.value })
    }

    const handleSave = () => { postSettings(settings) }

    return (
        <section>
            <header>
                <h2>Settings</h2>
            </header>
            <form>
                <label>Sensitivity: {settings.sens}</label>
                <input
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={settings.sens}
                    onChange={handleSensChange}
                />
                <label>Field of View: {settings.fov}</label>
                <input
                    type="range"
                    min="70"
                    max="130"
                    step="1"
                    value={settings.fov}
                    onChange={handleFovChange}
                />
                <label>Wall Color: {settings.wallColor}</label>
                <input
                    type="color"
                    value={settings.wallColor}
                    onChange={handleWallColorChange}
                />
                <button type="button" onClick={handleSave}>Save</button>
            </form>
        </section >
    )
}

const useSettings = () => {
    const [settings, setSettings] = useState({
        sens: 1,
        fov: 103,
        wallColor: '#808080'
    })

    useEffect(() => {
        (async () => {
            setSettings({ ...settings, ...(await getSettings()) })
        })()
    }, [])

    return [settings, setSettings]
}

export default Settings