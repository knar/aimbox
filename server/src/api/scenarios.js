import express from 'express'

const router = express.Router()

router.get('/', async (req, res) => {
    const collection = req.app.locals.db.collection('scenarios')
    const found = await collection.find()
    if (!found) {
        res.sendStatus(404)
    }

    const scens = await found.toArray()
    res.status(200).json(scens)
})

export default router