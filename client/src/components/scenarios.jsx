import React, { useState } from 'react'
import ScenarioPicker from './scenario-picker'
import GameWrapper from './game-wrapper'
import Runs from './runs'
import { useSettings } from '../hooks/useSettings'

const Scenarios = () => {
    const [pickedScen, setPickedScen] = useState()
    const [settings, _] = useSettings()
    const [leaderboardScen, setLeaderboardScen] = useState()

    const exitGame = () => {
        setPickedScen(undefined)
    }

    const reqParams = () => `/scen/${leaderboardScen._id}`

    return (
        <>
            {pickedScen
                ? <GameWrapper scenario={pickedScen} exitGame={exitGame} settings={settings} />
                : <ScenarioPicker
                    setPickedScen={setPickedScen}
                    setLeaderboardScen={setLeaderboardScen}
                />
            }
            {leaderboardScen
                ? <Runs
                    title={leaderboardScen.name}
                    reqParams={reqParams()}
                />
                : null
            }
        </>
    )
}

export default Scenarios