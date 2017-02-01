import React, { PropTypes } from 'react'
import Waveform from './WaveformOverview'

const playButton = (id, buffer, onPlay) =>
  <a href='#!' onClick={(e) => onPlay({ id, buffer })}>Play</a>

const pauseButton = (id, onPause) =>
  <a href='#!' onClick={(e) => onPause({ id })}>Pause</a>

const AudioPlayer = ({ id, url, buffer, playing, onPlay, onPause }) => (
  <div className='AudioPlayer Media'>
    <div className='transport Media-figure OneButton'>
      { playing ? pauseButton(id, onPause) : playButton(id, buffer, onPlay) }
    </div>
    <div className='Media-body'>
      { buffer ? <Waveform buffer={buffer} width='500' height='60' /> : 'loading buffer...' }
      <div className='AudioPlayer-info'>
        <p>{url}</p>
      </div>
    </div>
  </div>
)

AudioPlayer.propTypes = {
  id: PropTypes.number,
  url: PropTypes.string,
  buffer: PropTypes.object
}

export default AudioPlayer
