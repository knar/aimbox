import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

initializeApp({ credential: applicationDefault() })

const authenticate = async (req, res, next) => {
    try {
        const firebaseUser = req.headers.authtoken && await getAuth().verifyIdToken(req.headers.authtoken)
        if (!firebaseUser) {
            return res.sendStatus(401)
        }

        req.uid = firebaseUser.user_id
        next()
    } catch (err) {
        res.sendStatus(401)
    }
}

export default authenticate