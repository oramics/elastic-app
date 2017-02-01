import { combineReducers } from 'redux'
import { ADD_PLAYER, SET_BUFFER, PLAY_BUFFER, STOP_BUFFER } from './actions'
import { AudioPlayer } from './lib/audio'

const elasticApp = combineReducers({
  fragments, player
})

var audio = AudioPlayer()

function player (state = {}, action) {
  switch (action.type) {
    case PLAY_BUFFER:
      audio.play(action.buffer)
      return { currentId: action.id, currentBuffer: action.buffer }
    case STOP_BUFFER:
      audio.stop()
      return { currentId: null, currentBuffer: null }
    default:
      return state
  }
}

const buildFragment = (id, url) => ({ id, url, playing: false })

function fragments (state = [], action) {
  const { type, id } = action

  switch (type) {
    case ADD_PLAYER:
      return [...state, buildFragment(id, action.url)]
    case SET_BUFFER:
      return state.map((fragment) =>
        fragment.id !== id ? fragment
        : { ...fragment, buffer: action.buffer }
      )
    case PLAY_BUFFER:
      return state.map((fragment) =>
        fragment.id === id ? { ...fragment, playing: true }
        : fragment.playing ? { ...fragment, playing: false }
        : fragment
      )
    case STOP_BUFFER:
      return state.map((fragment) => fragment.id === id ? { ...fragment, playing: false } : fragment)
    default:
      return state

  }
}

export default elasticApp
