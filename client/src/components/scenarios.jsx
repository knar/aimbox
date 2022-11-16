import React, { useState } from 'react'
import ScenarioPicker from './scenario-picker'
import GameWrapper from './game-wrapper'
import { useSettings } from '../hooks/useSettings'

const Scenarios = () => {
    const [pickedScen, setPickedScen] = useState()
    const [settings, _] = useSettings()

    const exitGame = () => {
        setPickedScen(undefined)
    }

    return (
        <>
            {pickedScen
                ? <GameWrapper scenario={pickedScen} exitGame={exitGame} settings={settings} />
                : <ScenarioPicker setPickedScen={setPickedScen}></ScenarioPicker>
            }
        </>
    )
}

export default Scenarios