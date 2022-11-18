import React, { useEffect, useState } from 'react'
import { getRuns } from '../api'

const Runs = ({ title, reqParams }) => {
    const [runs, setRuns] = useState([])

    useEffect(() => {
        ;(async () => {
            const runs = await getRuns(reqParams)
            if (reqParams) {
                runs.sort((a, b) => a.stats.hits < b.stats.hits)
            } else {
                runs.sort((a, b) => a.finTime < b.finTime)
            }
            setRuns(runs)
        })()
    }, [reqParams])

    const runsList = runs.map((run, i) => (
        <tr key={i}>
            {run.scenarioName ? <td>{run.scenarioName}</td> : null}
            {run.displayName ? <td>{run.displayName}</td> : null}
            <td>{run.stats.hits}</td>
            <td>{run.stats.misses}</td>
            <td>{new Date(run.finTime).toLocaleString()}</td>
        </tr>
    ))

    return (
        <section>
            <header>
                <h2>{title}</h2>
                <table>
                    <thead>
                        <tr>
                            <td>{runs.length > 0 && runs[0].scenarioName ? 'Scenario' : 'User'}</td>
                            <td>Hits</td>
                            <td>Misses</td>
                            <td>Date</td>
                        </tr>
                    </thead>
                    <tbody>{runsList}</tbody>
                </table>
            </header>
        </section>
    )
}

export default Runs
