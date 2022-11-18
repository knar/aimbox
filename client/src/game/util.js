export const clamp = (a, min, max) => {
    if (a < min) {
        return min
    } else if (a > max) {
        return max
    }
    return a
}

export const halfpi = Math.PI * 0.5

export const dtor = deg => (deg * Math.PI) / 180

export const rtod = rad => (rad * 180) / Math.PI

export const rand = (min, max) => min + Math.random() * (max - min)

export const randInt = (min, max) => min + Math.floor(Math.random() * (max - min))

export const scaleFov = (fov, r) => {
    return rtod(Math.atan(r * Math.tan(dtor(fov / 2)))) * 2
}
