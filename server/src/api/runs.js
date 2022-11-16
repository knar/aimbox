import express from 'express'
import authenticate from '../middleware/authenticate.js'
import { ObjectId } from 'mongodb'

const router = express.Router()

// get all runs of scenario with scenId
router.get('/scen/:scenId', async (req, res) => {
    const collection = req.app.locals.db.collection('runs')
    const scenId = new ObjectId(req.params.scenId)
    let runs = await collection.aggregate([
        { $match: { scenId } },
        {
            $lookup: {
                from: 'users',
                localField: 'uid',
                foreignField: 'uid',
                as: 'user'
            }
        },
        { $unwind: '$user' },
        { $addFields: { displayName: '$user.settings.displayName' } },
        {
            $project: {
                displayName: true,
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

// get all runs of user with uid
router.get('/', authenticate, async (req, res) => {
    const collection = req.app.locals.db.collection('runs')
    let runs = await collection.aggregate([
        { $match: { uid: req.uid } },
        {
            $lookup: {
                from: 'scenarios',
                localField: 'scenId',
                foreignField: '_id',
                as: 'scenario'
            }
        },
        { $unwind: '$scenario' },
        { $addFields: { scenarioName: '$scenario.name' } },
        {
            $project: {
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