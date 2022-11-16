import { Euler, PerspectiveCamera, Raycaster, WebGLRenderer } from 'three'
import { drawCrosshair, drawStats } from './hud'
import { createBotMesh, createScene } from './scene'
import Sound from './sound'
import { clamp, halfpi, randInt, scaleFov } from './util'

export default class Game {
    #scenario
    #canvas
    #hudCanvas
    #fin
    #settings
    #state
    #raycaster
    #hitSound
    #renderer
    #frameId

    constructor(scenario, canvas, hudCanvas, fin, settings) {
        this.#scenario = scenario
        this.#canvas = canvas
        this.#hudCanvas = hudCanvas
        this.#fin = fin
        this.#settings = settings

        this.#state = {
            camera: new PerspectiveCamera(),
            scene: createScene(this.#scenario, this.#settings),
            bots: [],
            isPointerLocked: false,
            stats: {}
        }
        this.#state.camera.position.set(
            this.#scenario.spawn.x,
            this.#scenario.spawn.y,
            this.#scenario.spawn.z
        )

        this.#raycaster = new Raycaster()
        this.#hitSound = new Sound('./sounds/perc-808.ogg')
        this.#renderer = new WebGLRenderer({
            canvas: this.#canvas,
            antialias: false,
        })

        this.#registerEventListeners()
        this.#onWindowResize()
    }

    start() {
        if (!this.#state.isPointerLocked) {
            this.#hudCanvas.requestPointerLock()
        }

        this.#state.stats = {
            hits: 0,
            misses: 0,
        }

        this.#clearBots()
        this.#fillBots()

        this.#state.finTime = performance.now() + this.#scenario.duration * 1000
        this.#startLoop()

        drawCrosshair(this.#hudCanvas, this.#settings.crosshair)
    }

    #loop() {
        this.#frameId = null
        this.#startLoop()

        const now = performance.now()
        if (now > this.#state.finTime) {
            drawStats(this.#hudCanvas, this.#state.stats)
            this.#stopLoop()
            this.#fin(this.#state.stats, true)
            return
        }

        if (!this.#state.prevStatsDrawTime || now > this.#state.prevStatsDrawTime + 100) {
            drawStats(this.#hudCanvas, this.#state.stats)
            this.#state.prevStatsDrawTime = now
        }

        this.#renderer.render(this.#state.scene, this.#state.camera)
    }

    #shoot() {
        this.#raycaster.setFromCamera({ x: 0, y: 0 }, this.#state.camera)
        const intersects = this.#raycaster.intersectObjects(this.#state.bots, false)
        if (intersects.length > 0) {
            this.#removeBot(intersects[0].object)
            this.#addBot()
            this.#state.stats.hits++
            this.#hitSound.playSound(0, 0.01)
        } else {
            this.#state.stats.misses++
        }
    }

    #fillBots() {
        while (this.#state.bots.length < this.#scenario.botCount) {
            this.#addBot()
        }
    }

    #addBot() {
        const x = randInt(this.#scenario.botSpawn.x[0], this.#scenario.botSpawn.x[1])
        const y = randInt(this.#scenario.botSpawn.y[0], this.#scenario.botSpawn.y[1])
        const z = randInt(this.#scenario.botSpawn.z[0], this.#scenario.botSpawn.z[1])

        const mesh = createBotMesh({ x, y, z }, this.#scenario.botRadius, this.#settings.botColor)
        this.#state.bots.push(mesh)
        this.#state.scene.add(mesh)
    }

    #clearBots() {
        for (let i = 0; i < this.#state.bots.length; i++) {
            this.#state.scene.children.splice(
                this.#state.scene.children.indexOf(this.#state.bots[i]), 1)
        }
        this.#state.bots = []
    }

    #removeBot(bot) {
        this.#state.scene.children.splice(this.#state.scene.children.indexOf(bot), 1)
        this.#state.bots.splice(this.#state.bots.indexOf(bot), 1)
    }

    #startLoop() {
        if (!this.#frameId) {
            this.#frameId = requestAnimationFrame(() => this.#loop())
        }
    }

    #stopLoop() {
        if (this.#frameId) {
            cancelAnimationFrame(this.#frameId)
            this.#frameId = undefined
            document.exitPointerLock()
        }
    }

    #registerEventListeners() {
        this.#hudCanvas.addEventListener('mousedown', e => this.#onMouseDown(e))
        document.addEventListener('mousemove', e => this.#onMouseMove(e))
        document.addEventListener('keydown', e => this.#onKeyDown(e))
        document.addEventListener('pointerlockchange', () => this.#onPointerLockChange())
        window.addEventListener('resize', () => this.#onWindowResize())
    }

    #onMouseDown(e) {
        if (e.button === 0) {
            if (this.#state.isPointerLocked) {
                this.#shoot()
            }
        }
    }

    #onMouseMove(e) {
        if (this.#state.isPointerLocked) {
            const sens = this.#settings.sens * 0.001
            const euler = new Euler(0, 0, 0, 'YXZ')
            euler.setFromQuaternion(this.#state.camera.quaternion)
            euler.y -= e.movementX * sens
            euler.x -= e.movementY * sens
            euler.x = clamp(euler.x, -halfpi, halfpi)
            this.#state.camera.quaternion.setFromEuler(euler)
        }
    }

    #onKeyDown(e) {
        if (e.code === 'KeyR') {
            if (this.#state.finTime > performance.now()) {
                if (!this.#state.isPointerLocked) {
                    this.#hudCanvas.requestPointerLock()
                }
                this.start()
            }
        }
    }

    #onPointerLockChange() {
        this.#state.isPointerLocked = (document.pointerLockElement === this.#hudCanvas)

        if (!this.#state.isPointerLocked) {
            this.#stopLoop()
            this.#fin(this.#state.stats, false)
        }
    }

    #onWindowResize() {
        const width = window.innerWidth
        const height = window.innerHeight
        this.#canvas.width = width
        this.#canvas.height = height
        this.#hudCanvas.width = width
        this.#hudCanvas.height = height
        this.#state.camera.aspect = width / height
        this.#state.camera.fov = scaleFov(this.#settings.fov, height / width)
        this.#state.camera.updateProjectionMatrix()
        this.#renderer.setSize(width, height)
        this.#renderer.render(this.#state.scene, this.#state.camera)
        drawCrosshair(this.#hudCanvas, this.#settings.crosshair)
    }
}
