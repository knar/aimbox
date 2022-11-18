import React, { useState } from 'react'
import { useSettings } from '../hooks/useSettings'
import GameWrapper from './game-wrapper'
import Runs from './runs'
import ScenarioPicker from './scenario-picker'

const Scenarios = () => {
    const [pickedScen, setPickedScen] = useState()
    const [settings, _] = useSettings()
    const [leaderboardScen, setLeaderboardScen] = useState()

    const exitGame = () => {
        setPickedScen(undefined)
    }

    return (
        <>
            {pickedScen ? (
                <GameWrapper scenario={pickedScen} exitGame={exitGame} settings={settings} />
            ) : (
                <ScenarioPicker
                    setPickedScen={setPickedScen}
                    setLeaderboardScen={setLeaderboardScen}
                />
            )}
            {leaderboardScen ? (
                <Runs title={leaderboardScen.name} reqParams={`/scen/${leaderboardScen._id}`} />
            ) : null}
        </>
    )
}

export default Scenarios
