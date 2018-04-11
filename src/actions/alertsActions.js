import { ADD_ALERT, REMOVE_ALERT } from './types';

export function addAlert(text) {
  return {
    type: ADD_ALERT,
    payload: text,
  };
}

export function removeAlert(id) {
  return {
    type: REMOVE_ALERT,
    payload: id,
  };
}
