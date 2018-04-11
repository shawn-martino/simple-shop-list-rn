import { ADD_ITEM, DEL_ITEM, EDIT_ITEM, SET_ITEMS } from '../actions';

export default function (state = [], action) {
  switch (action.type) {
    case ADD_ITEM: {
      return [...state, { ...action.payload, id: `${Date.now()}` }];
    }

    case DEL_ITEM:
      return state.filter(item => item.id !== action.payload);

    case EDIT_ITEM: {
      const newState = [...state];
      const indexEdited = newState.findIndex(item => item.id === action.payload.id);
      newState[indexEdited] = {
        ...newState[indexEdited],
        ...action.payload,
      };
      return newState;
    }

    case SET_ITEMS:
      return action.payload;

    case 'GET_MOCK_ITEMS':
      return action.payload;

    default:
      return state;
  }
}
