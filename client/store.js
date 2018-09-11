import axios from 'axios';
import { createStore, applyMiddleware } from 'redux'
import loggingMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import socket from './socket'

// INITIAL STATE

const initialState = {
  messages: [],
  name: 'Reggie',
  newMessageEntry: ''
}

// ACTION TYPES

const GET_MESSAGE = 'GET_MESSAGE'
const GET_MESSAGES = 'GET_MESSAGES'
const WRITE_MESSAGE = 'WRITE_MESSAGE'

// ACTION CREATORS

export const getMessage = (message) => {
  return { type: GET_MESSAGE, message }
}

export const getMessages = (messages) => {
  return { type: GET_MESSAGES, messages }
}

export const writeMessage = (content) => {
  return { type: WRITE_MESSAGE, content }
}

// THUNK CREATORS

export const postMessage = (message) => {
  return async (dispatch) => {
    const response = await axios.post('/api/messages', message)
    const newMessage = response.data
    const action = getMessage(newMessage)
    dispatch(action)
    socket.emit('new-message', newMessage)
  }
}

const reducer = (state = initialState, action) => {

  switch (action.type) {


    case GET_MESSAGES:
      return {
        ...state,
        messages: action.messages
      }

    case GET_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message]
      }

    case WRITE_MESSAGE:
      return {
        ...state,
        newMessageEntry: action.content
      }

    default:
      return state;
  }

}

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(
    thunkMiddleware,
    loggingMiddleware
  ))
)

export default store