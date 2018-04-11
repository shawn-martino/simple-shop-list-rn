import uuid from 'uuid';
import { ADD_ALERT, REMOVE_ALERT } from '../actions';

const defaultState = [];

export default function (state = defaultState, action) {
  switch (action.type) {
    case ADD_ALERT:
      return [...state, { text: action.payload, id: uuid.v4() }];

    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload);

    default:
      return state;
  }
}
