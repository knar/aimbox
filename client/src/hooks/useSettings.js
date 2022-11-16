import { useEffect, useState } from 'react'
import { getSettings } from '../api'

export const useSettings = () => {
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
        },
        displayName: 'Anon',
    })

    useEffect(() => {
        (async () => {
            setSettings({ ...settings, ...(await getSettings()) })
        })()
    }, [])

    return [settings, setSettings]
}