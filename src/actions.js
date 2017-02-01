import { AudioLoader } from './lib/audio'

export const ADD_PLAYER = 'ADD_PLAYER'
export const SET_BUFFER = 'SET_BUFFER'
export const PLAY_BUFFER = 'PLAY_BUFFER'
export const STOP_BUFFER = 'STOP_BUFFER'

export const addPlayer = ({ url, id }) => ({ type: ADD_PLAYER, url, id })
export const setBuffer = ({ id, buffer }) => ({ type: SET_BUFFER, id, buffer })
export const playBuffer = ({id, buffer}) => ({ type: PLAY_BUFFER, id, buffer })
export const stopBuffer = ({ id }) => ({ type: STOP_BUFFER, id })

var loader = AudioLoader()

// redux-thunk
let nextId = 0
export const addAudio = ({ url }) => (dispatch) => {
  console.log('addAudio', dispatch)
  var id = ++nextId
  loader.loadAudio(url).then(buffer => dispatch(setBuffer({ id, buffer })))
  dispatch(addPlayer({ url, id }))
}
