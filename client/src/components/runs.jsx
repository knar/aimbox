import React, { useEffect, useState } from 'react'
import { getRuns } from '../api'

const Runs = () => {
    const [runs, setRuns] = useState([])
    useEffect(() => {
        (async () => {
            const runs = await getRuns()
            runs.sort((a, b) => a.finTime < b.finTime)
            setRuns(runs)
        })()
    }, [])

    const runsList = runs.map((run, i) =>
        <tr key={i}>
            <td>{run.scenarioName}</td>
            <td>{run.displayName}</td>
            <td>{run.stats.hits}</td>
            <td>{run.stats.misses}</td>
            <td>{(new Date(run.finTime)).toLocaleDateString()}</td>
        </tr>
    )

    return (
        <section>
            <header>
                <h2>Runs</h2>
                <table>
                    <thead>
                        <tr>
                            <td>Scenario</td>
                            <td>User</td>
                            <td>Hits</td>
                            <td>Misses</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody>
                        {runsList}
                    </tbody>
                </table>
            </header>
        </section>
    )
}

export default Runs