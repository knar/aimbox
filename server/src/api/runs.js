import express from 'express'
import authenticate from '../middleware/authenticate.js'

const router = express.Router()

router.get('/', async (req, res) => {
    const collection = req.app.locals.db.collection('runs')
    const found = await collection.find()
    if (!found) {
        res.sendStatus(404)
    }

    const runs = await found.toArray()
    res.status(200).json(runs)
})

router.post('/', authenticate, async (req, res) => {
    const collection = req.app.locals.db.collection('runs')
    collection.insertOne({
        uid: req.uid,
        scenId: req.body.scenId,
        finTime: req.body.finTime,
        stats: req.body.stats,
    })
    res.sendStatus(200)
})

export default router