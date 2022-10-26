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

router.post('/', async (req, res) => {
    const collection = req.app.locals.db.collection('scenarios')
    collection.updateOne(
        { name: req.body.name },
        { $set: { ...req.body } },
        { upsert: true }
    )
    res.sendStatus(200)
})

export default router