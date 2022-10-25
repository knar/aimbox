import {
    AmbientLight,
    BoxGeometry,
    Color,
    DoubleSide,
    Mesh,
    MeshStandardMaterial,
    PointLight,
    Scene
} from 'three'

export const createScene = (scen, settings) => {
    const scene = new Scene()
    scene.background = new Color(0xffffff)

    const geo = new BoxGeometry(scen.walls[0], scen.walls[1], scen.walls[2])
    const mat = new MeshStandardMaterial({
        color: settings.wallColor,
        roughness: 0.9
    })
    mat.side = DoubleSide
    const box = new Mesh(geo, mat)
    scene.add(box)

    const ambientLight = new AmbientLight(0xffffff, .5)
    scene.add(ambientLight)

    const pointLight = new PointLight(0xffffff, scen.light.intensity)
    pointLight.position.x = scen.light.x
    pointLight.position.y = scen.light.y
    pointLight.position.z = scen.light.z
    scene.add(pointLight)

    return scene
}