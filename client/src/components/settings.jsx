import React, { useState, useEffect } from 'react'
import { getSettings, postSettings } from '../api'

const SettingsComponent = () => {
    const [settings, setSettings] = useSettings()

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
                    onChange={e => setSettings({ sens: e.target.value, ...settings })}
                />
                <label>Field of View: {settings.fov}</label>
                <input
                    type="range"
                    min="70"
                    max="130"
                    step="1"
                    value={settings.fov}
                    onChange={e => setSettings({ fov: e.target.value, ...settings })}
                />
                <button type="button" onClick={() => postSettings(settings)}>Save</button>
            </form>
        </section>
    )
}

const useSettings = () => {
    const [settings, setSettings] = useState({ sens: 1, fov: 103 })

    useEffect(() => {
        (async () => {
            setSettings(await getSettings())
        })()
    }, [])

    return [settings, setSettings]
}

export default SettingsComponent