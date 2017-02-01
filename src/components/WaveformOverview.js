import React, { Component } from 'react'
import { Waveform } from '../lib/waveform'

export default class WaveformOverview extends Component {
  constructor (props) {
    super(props)
    this.wave = Waveform(props.buffer.getChannelData(0), { width: props.width, height: props.height })
  }

  componentDidMount () {
    this.paint(this.canvas)
  }
  componentDidUpdate () {
    this.paint(this.canvas)
  }

  paint (canvas) {
    const buffer = this.props.buffer
    const ctx = canvas.getContext('2d')
    const { width, height } = canvas

    if (buffer) {
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, width, height)
      this.wave.draw(ctx)
    }
  }

  render () {
    return (
      <div className='WaveformOverview'>
        <canvas ref={(c) => { this.canvas = c }} width='500' height='60' />
      </div>
    )
  }
}
