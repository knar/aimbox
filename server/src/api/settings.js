import express from 'express'
import authenticate from '../middleware/authenticate.js'

const router = express.Router()

router.get('/', authenticate, async (req, res) => {
    const collection = req.app.locals.db.collection('users')
    const found = await collection.findOne({ uid: req.uid })
    if (!found || !(found.settings)) {
        res.sendStatus(404)
    }
    res.status(200).json(found.settings)
})

router.post('/', authenticate, async (req, res) => {
    const collection = req.app.locals.db.collection('users')
    collection.updateOne(
        { uid: req.uid },
        { $set: { uid: req.uid, settings: req.body } },
        { upsert: true }
    )
    res.sendStatus(200)
})

export default router