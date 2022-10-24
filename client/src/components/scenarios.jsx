import React, { useState } from 'react'
import ScenarioPicker from './scenario-picker'
import Game from './game'

const Scenarios = () => {
    const [pickedScen, setPickedScen] = useState()

    const exitGame = () => {
        setPickedScen(undefined)
    }

    return (
        <>
            {pickedScen
                ? <Game scen={pickedScen} exitGame={exitGame} />
                : <ScenarioPicker setPickedScen={setPickedScen}></ScenarioPicker>
            }
        </>
    )
}

export default Scenarios