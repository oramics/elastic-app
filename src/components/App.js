import React, { Component } from 'react'
import { connect } from 'react-redux'
import AudioPlayer from './AudioPlayer'
import CreateAudio from './CreateAudio'
import { playBuffer, stopBuffer } from '../actions'
import './App.css'

const about = () => (
  <div>
    <p>Elastica is a library to perform time-stretch on audio signals.</p>
    <p>Use the form below to load an audio file (via URL) and perform
      a time-stretch algorithm on it.</p>
  </div>
)

class App extends Component {
  constructor (props) {
    super(props)
    this.handleAddAudio = (props) => console.log('Add Audio!', props)
  }
  render () {
    var fragments = this.props.fragments.map((fragment) => (
      <AudioPlayer {...fragment} key={fragment.id}
        onPause={this.props.stopBuffer}
        onPlay={this.props.playBuffer} />
    ))
    return (
      <div className='App'>
        <h1>elastica demo application</h1>
        { this.props.fragments.length ? '' : about() }
        <div className='fragments'>
          {fragments}
          <CreateAudio onAdd={this.handleAddAudio} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  fragments: state.fragments
})

export default connect(mapStateToProps, { playBuffer, stopBuffer })(App)
