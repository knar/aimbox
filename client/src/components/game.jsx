import React, { useEffect } from 'react'
import { setup } from '../game/main'
import './game.css'

const Game = ({ scen, exitGame }) => {
    useEffect(() => {
        const hudCanvas = document.getElementsByClassName('three-canvas')[0]
        const threeCanvas = document.getElementsByClassName('three-canvas')[0]
        setup({ scen, exitGame, hudCanvas, threeCanvas })
    }, [])

    return (
        <>
            <canvas className="hud-canvas"></canvas>
            <canvas className="three-canvas"></canvas>
        </>
    )
}

export default Game