import React, { useState } from 'react'
import ScenarioPicker from './scenario-picker'
import GameWrapper from './game-wrapper'

const Scenarios = () => {
    const [pickedScen, setPickedScen] = useState()

    const exitGame = () => {
        setPickedScen(undefined)
    }

    return (
        <>
            {pickedScen
                ? <GameWrapper scenario={pickedScen} exitGame={exitGame} />
                : <ScenarioPicker setPickedScen={setPickedScen}></ScenarioPicker>
            }
        </>
    )
}

export default Scenarios