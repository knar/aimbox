import { getSettings } from '../api'

export const setup = async (opts) => {
    const { scen, exitGame, threeCanvas, hudCanvas } = opts
    const settings = await getSettings()

    console.log(scen, settings)
}