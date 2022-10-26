import React, { useEffect, useState } from 'react'
import { getSettings, postSettings } from '../api'

const Settings = () => {
    const [settings, setSettings] = useSettings()

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
                    onChange={e => setSettings({ ...settings, sens: parseFloat(e.target.value) })}
                />
                <label>Field of View: {settings.fov}</label>
                <input
                    type="range"
                    min="70"
                    max="130"
                    step="1"
                    value={settings.fov}
                    onChange={e => setSettings({ ...settings, fov: parseInt(e.target.value) })}
                />
                <label>Wall Color: {settings.wallColor}</label>
                <input
                    type="color"
                    value={settings.wallColor}
                    onChange={e => setSettings({ ...settings, wallColor: e.target.value })}
                />
                <label>Bot Color: {settings.botColor}</label>
                <input
                    type="color"
                    value={settings.botColor}
                    onChange={e => setSettings({ ...settings, botColor: e.target.value })}
                />

                <label>Crosshair Size: {settings.crosshair.size}</label>
                <input
                    type="range"
                    min="0"
                    max="15"
                    step="1"
                    value={settings.crosshair.size}
                    onChange={e => setSettings({ ...settings, crosshair: { ...settings.crosshair, size: parseInt(e.target.value) } })}
                />

                <label>Crosshair Width: {settings.crosshair.width}</label>
                <input
                    type="range"
                    min="0"
                    max="15"
                    step="1"
                    value={settings.crosshair.width}
                    onChange={e => setSettings({ ...settings, crosshair: { ...settings.crosshair, width: parseInt(e.target.value) } })}
                />

                <label>Crosshair Gap: {settings.crosshair.gap}</label>
                <input
                    type="range"
                    min="0"
                    max="15"
                    step="1"
                    value={settings.crosshair.gap}
                    onChange={e => setSettings({ ...settings, crosshair: { ...settings.crosshair, gap: parseInt(e.target.value) } })}
                />

                <label>Crosshair Outline Width: {settings.crosshair.outlineWidth}</label>
                <input
                    type="range"
                    min="0"
                    max="15"
                    step="1"
                    value={settings.crosshair.outlineWidth}
                    onChange={e => setSettings({ ...settings, crosshair: { ...settings.crosshair, outlineWidth: parseInt(e.target.value) } })}
                />

                <label>Crosshair Color: {settings.crosshair.color}</label>
                <input
                    type="color"
                    value={settings.crosshair.color}
                    onChange={e => setSettings({ ...settings, crosshair: { ...settings.crosshair, color: e.target.value } })}
                />

                <label>Crosshair Outline Color: {settings.crosshair.outlineColor}</label>
                <input
                    type="color"
                    value={settings.crosshair.outlineColor}
                    onChange={e => setSettings({ ...settings, crosshair: { ...settings.crosshair, outlineColor: e.target.value } })}
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
        wallColor: '#808080',
        botColor: '#101010',
        crosshair: {
            size: 4,
            width: 2,
            gap: 0,
            outlineWidth: 1,
            color: '#ffe600',
            outlineColor: '#000000',
        }
    })

    useEffect(() => {
        (async () => {
            setSettings({ ...settings, ...(await getSettings()) })
        })()
    }, [])

    return [settings, setSettings]
}

export default Settings