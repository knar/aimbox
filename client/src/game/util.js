export const clamp = (a, min, max) => {
    if (a < min) {
        return min
    } else if (a > max) {
        return max
    }
    return a
}

export const halfpi = Math.PI * 0.5

export const scaleFov = (fov, r) => {
    const rad = (fov / 2) * Math.PI / 180
    const adj = 1 / Math.tan(rad)
    const scaled = Math.atan(r / adj)
    return scaled * 2 * 180 / Math.PI
    //return 2 * Math.atan(r / (1 / Math.tan((fov / 2 * Math.PI / 180))))
}