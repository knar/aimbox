import React, { useEffect } from 'react'
import Game from '../game/game'
import './game-wrapper.css'

const GameWrapper = ({ scenario, exitGame }) => {
    useEffect(() => {
        const canvas = document.getElementsByClassName('three-canvas')[0]
        const hudCanvas = document.getElementsByClassName('hud-canvas')[0]

        const game = new Game({ scenario, exitGame, canvas, hudCanvas })
        game.init()
    }, [])

    return (
        <>
            <canvas className="three-canvas"></canvas>
            <canvas className="hud-canvas"></canvas>
        </>
    )
}

export default GameWrapper