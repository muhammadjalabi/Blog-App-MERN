import { SET_ERRORS } from '../actions/types'

const initState = {};

export default function(state = initState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return action.payload
    default:
      return state;
  }
}

