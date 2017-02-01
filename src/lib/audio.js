/* global fetch */
var ac = require('audio-context')

export function AudioLoader () {
  var buffers = {}

  return {
    loadAudio (url) {
      return buffers[url] ? Promise.resolve(buffers[url])
        : fetch(url).then(decodeArrayBuffer(ac)).then((buffer) => {
          buffers[url] = buffer
          return buffer
        })
    }
  }
}

export function AudioPlayer () {
  var source = null

  return {
    play (buffer) {
      if (source) source.stop()
      source = ac.createBufferSource()
      source.buffer = buffer
      source.connect(ac.destination)
      source.start()
    },
    stop () {
      if (source) source.stop()
      source = null
    }
  }
}

function decodeArrayBuffer (context) {
  return function (response) {
    const next = typeof response.arrayBuffer === 'function'
    ? response.arrayBuffer() : Promise.resolve(response)

    return next.then(arrayBuffer => new Promise(function (resolve, reject) {
      context.decodeAudioData(arrayBuffer, resolve, reject)
    }))
  }
}
