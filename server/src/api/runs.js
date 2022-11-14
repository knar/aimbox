import express from 'express'
import authenticate from '../middleware/authenticate.js'
import { ObjectId } from 'mongodb'

const router = express.Router()

router.get('/', async (req, res) => {
    const collection = req.app.locals.db.collection('runs')

    let runs = await collection.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'uid',
                foreignField: 'uid',
                as: 'user'
            },
        },
        {
            $unwind: '$user'
        },
        {
            $lookup: {
                from: 'scenarios',
                localField: 'scenId',
                foreignField: '_id',
                as: 'scenario'
            }
        },
        {
            $unwind: '$scenario'
        },
        {
            $addFields: {
                displayName: '$user.settings.displayName',
                scenarioName: '$scenario.name',
            }
        },
        {
            $project: {
                displayName: true,
                scenarioName: true,
                finTime: true,
                stats: true,
                _id: false,
            }
        }
    ])

    if (!runs) {
        res.sendStatus(404)
    }

    runs = await runs.toArray()
    res.status(200).json(runs)
})

router.post('/', authenticate, async (req, res) => {
    const collection = req.app.locals.db.collection('runs')
    collection.insertOne({
        uid: req.uid,
        scenId: new ObjectId(req.body.scenId),
        finTime: req.body.finTime,
        stats: req.body.stats,
    })
    res.sendStatus(200)
})

export default router