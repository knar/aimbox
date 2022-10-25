import { Euler, PerspectiveCamera, WebGLRenderer } from 'three'
import { getSettings } from '../api'
import { createScene } from './scene'
import { clamp, halfpi, scaleFov } from './util'

export default class Game {
    #frameId
    #endTime
    #scenario
    #exitGame
    #canvas
    #hudCanvas
    #settings
    #state
    #renderer
    #prevTime

    constructor({ scenario, exitGame, canvas, hudCanvas }) {
        this.#scenario = scenario
        this.#exitGame = exitGame
        this.#canvas = canvas
        this.#hudCanvas = hudCanvas
    }

    async init() {
        this.#settings = await getSettings()
        this.#state = {
            camera: new PerspectiveCamera(),
            scene: createScene(this.#scenario, this.#settings),
            isPointerLocked: false,
        }
        this.#renderer = new WebGLRenderer({
            canvas: this.#canvas,
            antialias: false,
        })

        this.#onWindowResize()
        this.#registerEventListeners()
    }

    start() {
        this.#endTime = performance.now() + this.#scenario.duration * 1000
        this.#state.camera.position.setX(this.#scenario.spawn.x)
        this.#state.camera.position.setY(this.#scenario.spawn.y)
        this.#state.camera.position.setZ(this.#scenario.spawn.z)
        this.#startLoop()
    }

    #loop() {
        this.#frameId = null
        this.#startLoop()

        const now = performance.now()
        if (now > this.#endTime) {
            this.#stopLoop()
            console.log("Game ended...")
        }

        // const dt = now - this.#prevTime
        // TODO: use dt to update bot movements

        this.#prevTime = now
        this.#renderer.render(this.#state.scene, this.#state.camera)
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
        }
        // TODO: exit pointer lock as well?
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
            if (!this.#state.isPointerLocked) {
                this.#hudCanvas.requestPointerLock()
                this.start()
                return
            }
        }
    }

    #onMouseMove(e) {
        const sens = this.#settings.sens * 0.001
        const euler = new Euler(0, 0, 0, 'YXZ')
        euler.setFromQuaternion(this.#state.camera.quaternion)
        euler.y -= e.movementX * sens
        euler.x -= e.movementY * sens
        euler.x = clamp(euler.x, -halfpi, halfpi)
        this.#state.camera.quaternion.setFromEuler(euler)
    }

    #onKeyDown(e) {
        if (e.code === 'Escape') {
            this.#exitGame()
        }
    }

    #onPointerLockChange() {
        this.#state.isPointerLocked = (document.pointerLockElement === this.hudCanvas)
    }

    #onWindowResize() {
        const width = window.innerWidth
        const height = window.innerHeight
        if (this.#canvas.width !== width || this.#canvas.height !== height) {
            this.#canvas.width = width
            this.#canvas.height = height
            this.#hudCanvas.width = width
            this.#hudCanvas.height = height

            this.#renderer.setSize(width, height)
            this.#state.camera.aspect = width / height
            this.#state.camera.fov = scaleFov(this.#settings.fov, height / width)
            this.#state.camera.updateProjectionMatrix()
        }
    }
}
