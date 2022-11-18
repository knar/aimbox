import express from 'express'
import authenticate from '../middleware/authenticate.js'

const router = express.Router()

router.post('/', authenticate, async (req, res) => {
    const collection = req.app.locals.db.collection('users')
    const found = await collection.findOne({ uid: req.uid })
    if (!found) {
        await collection.insertOne({ uid: req.uid })
    }

    res.sendStatus(200)
})

export default router
