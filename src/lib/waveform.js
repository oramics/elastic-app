
export function Waveform (src, { width, height, maxStep = 1000 }) {
  let { data } = resample(src, width, maxStep)
  let vcenter = Math.floor(height / 2)
  return {
    draw (ctx) {
      ctx.fillStyle = '#c00'
      for (var i = 0; i < data.length; i++) {
        const [pos, neg] = data[i]
        ctx.fillRect(i, vcenter - pos * vcenter, 1, vcenter * (pos - neg))
      }
    }
  }
}

function resample (src, width, maxStep) {
  var data = []
  var peak = 0
  var step = Math.ceil(src.length / width)
  var max = Math.min(step, maxStep)

  for (var i = 0; i < width; i++) {
    var neg = 0
    var pos = 0
    for (var j = 0; j < max; j++) {
      var val = src[(i * step) + j]
      if (val < 0) neg += val
      else pos += val
    }
    neg = neg / max
    pos = pos / max
    peak = Math.max(peak, pos, -neg)
    data.push([pos, neg])
  }
  return { data, peak }
}
