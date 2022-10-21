import express from 'express'
import cors from 'cors'
import db from './db/db.js'
import userRouter from './api/user.js'
import settingsRouter from './api/settings.js'
import scenarioRouter from './api/scenarios.js'

const app = express()
db(process.env.ATLAS_URI, app)

app.use(cors())
app.use(express.json())
app.use('/api/user', userRouter)
app.use('/api/settings', settingsRouter)
app.use('/api/scenarios', scenarioRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`)
})