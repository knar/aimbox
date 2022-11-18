// https://stackoverflow.com/questions/61453760/how-to-rapidly-play-multiple-copies-of-a-soundfile-in-javascript

export default class Sound {
    constructor(url) {
        this.context = new AudioContext()

        const request = new XMLHttpRequest()
        request.open('GET', url, true)
        request.responseType = 'arraybuffer'

        request.onload = () => {
            this.context.decodeAudioData(
                request.response,
                buffer => {
                    if (!buffer) {
                        console.log('Error decoding file data: ' + url)
                        return
                    }
                    this.soundBuffer = buffer
                },
                () => console.log('BufferLoader: XHR error')
            )
        }
        request.send()
    }

    playSound(time, volume) {
        const source = this.context.createBufferSource()
        source.buffer = this.soundBuffer
        source.connect(this.context.destination)

        const gainNode = this.context.createGain()
        source.connect(gainNode)
        gainNode.connect(this.context.destination)
        gainNode.gain.value = volume

        source.start(time)
    }
}
