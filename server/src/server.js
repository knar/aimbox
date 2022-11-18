import cors from 'cors'
import express from 'express'
import runsRouter from './api/runs.js'
import scenariosRouter from './api/scenarios.js'
import settingsRouter from './api/settings.js'
import userRouter from './api/user.js'
import db from './db/db.js'

const app = express()
db(process.env.ATLAS_URI, app)

app.use(cors())
app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/settings', settingsRouter)
app.use('/api/scenarios', scenariosRouter)
app.use('/api/runs', runsRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})
