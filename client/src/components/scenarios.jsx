import React, { useEffect, useState } from 'react'
import { getScenarios } from '../api'

const ScenariosComponent = () => {
    const scens = useScens()

    const scenCards = scens.map(scen =>
        <aside key={scen._id}>
            <h3>{scen.name}</h3>
            <p>{scen.desc}</p>
        </aside>
    )

    return (
        <section>
            <header>
                <h2>Scenarios</h2>
                <p>Choose one of the scenarios below!</p>
            </header>
            {scenCards}
        </section>
    )
}

const useScens = () => {
    const [scens, setScens] = useState([])

    useEffect(() => {
        (async () => {
            setScens(await getScenarios())
        })()
    }, [])

    return scens
}

export default ScenariosComponent