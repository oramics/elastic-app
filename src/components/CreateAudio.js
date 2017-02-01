import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addAudio } from '../actions'

const URL = 'https://oramics.github.io/sampled/TEST/audio/kevin-macleod-danse-macabre-finale.mp3'

class CreateAudio extends Component {
  constructor (props) {
    super(props)
    this.state = { url: URL }
    this.handleChange = (e) => this.setState({ url: e.target.value })
    this.handleSubmit = (e) => {
      e.preventDefault()
      this.props.addAudio(this.state)
    }
  }
  render () {
    return (
      <div className='CreateAudio Media'>
        <div className='Media-figure OneButton'>
          <a href='#!' onClick={this.handleSubmit}>Add</a>
        </div>
        <div className='Media-body'>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Audio url:</label>
              <input type='text' onChange={this.handleChange} value={this.state.url} />
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

export default connect(mapStateToProps, { addAudio })(CreateAudio)
