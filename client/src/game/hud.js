export const drawStats = (canvas, stats) => {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(10, 10, 400, 30)
    ctx.font = '30px mono'
    ctx.textBaseline = 'top'
    ctx.fillText(`Hits: ${stats.hits}   Misses: ${stats.misses}`, 10, 10, 400)
}

export const drawCrosshair = (canvas, opts) => {
    const ctx = canvas.getContext('2d')
    const x = Math.round(canvas.width / 2)
    const y = Math.round(canvas.height / 2)
    const ow = opts.outlineWidth
    const size = opts.size
    const gap = opts.gap

    if (ow > 0) {
        ctx.strokeStyle = opts.outlineColor
        ctx.lineWidth = opts.width + 2 * ow
        ctx.beginPath();
        ctx.moveTo(x - gap + ow, y)
        ctx.lineTo(x - gap - ow - size, y)
        ctx.moveTo(x + gap - ow, y)
        ctx.lineTo(x + gap + ow + size, y)
        ctx.moveTo(x, y - gap + ow)
        ctx.lineTo(x, y - gap - ow - size)
        ctx.moveTo(x, y + gap - ow)
        ctx.lineTo(x, y + gap + ow + size)
        ctx.stroke()
    }

    if (opts.width > 0) {
        ctx.strokeStyle = opts.color
        ctx.lineWidth = opts.width
        ctx.beginPath()
        ctx.moveTo(x - gap, y)
        ctx.lineTo(x - gap - size, y)
        ctx.moveTo(x + gap, y)
        ctx.lineTo(x + gap + size, y)
        ctx.moveTo(x, y - gap)
        ctx.lineTo(x, y - gap - size)
        ctx.moveTo(x, y + gap)
        ctx.lineTo(x, y + gap + size)
        ctx.stroke()
    }
}