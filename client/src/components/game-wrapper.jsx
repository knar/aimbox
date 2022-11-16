import React, { useEffect, useRef, useState } from 'react'
import { postRun } from '../api'
import Game from '../game/game'
import './game-wrapper.css'

const GameWrapper = ({ scenario, exitGame, settings }) => {
    const [showStartPopup, setShowStartPopup] = useState(true)
    const [showFinPopup, setShowFinPopup] = useState(false)
    const [stats, setStats] = useState({})
    const threeCanvasRef = useRef()
    const hudCanvasRef = useRef()
    const gameRef = useRef()

    useEffect(() => {
        gameRef.current = new Game(
            scenario,
            threeCanvasRef.current,
            hudCanvasRef.current,
            fin,
            settings
        )
    }, [])

    const start = () => {
        setShowStartPopup(false)
        setShowFinPopup(false)
        gameRef.current.start()
    }

    const fin = (stats, completed = false) => {
        if (completed) {
            postRun({
                scenId: scenario._id,
                finTime: Date.now(),
                stats,
            })
        }

        setStats(stats)
        setShowFinPopup(true)
    }

    const startPopup = (
        <section className="popup">
            <aside>
                <h4>{scenario.name}</h4>
                <p>{scenario.desc}</p>
                <button type="button" onClick={start}>Start</button>
            </aside>
        </section>
    )

    const finPopup = (
        <section className="popup">
            <aside>
                <h4>Fin</h4>
                <p>Scenario: {scenario.name}</p>
                <p>Hits: {stats.hits}</p>
                <p>Misses: {stats.misses}</p>
                <button type="button" onClick={start}>Play Again</button>
                <button type="button" onClick={exitGame}>Exit</button>
            </aside>
        </section>
    )

    return (
        <>
            <canvas ref={threeCanvasRef} className="three-canvas" />
            <canvas ref={hudCanvasRef} className="hud-canvas" />
            {showStartPopup ? startPopup : null}
            {showFinPopup ? finPopup : null}
        </>
    )
}

export default GameWrapper