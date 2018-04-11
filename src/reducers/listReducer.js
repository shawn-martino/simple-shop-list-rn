import {
  LIST_ADD_ITEM,
  LIST_GET_ITEMS,
  LIST_EDIT_ITEM,
  LIST_CHECK_ITEM,
  LIST_DEL_ITEMS,
} from '../actions';

export default function (state = [], action) {
  switch (action.type) {
    case LIST_GET_ITEMS: {
      const checkedItems = state.reduce((array, item) => {
        if (item.checked === true) return array.concat(item.id);
        return array;
      }, []);
      const newState = action.payload.map((item) => {
        const newItem = item;
        if (checkedItems.includes(item.id)) {
          newItem.checked = true;
        }
        return item;
      });
      return newState;
    }

    case LIST_ADD_ITEM: {
      if (Array.isArray(action.payload)) {
        const removeDuplicates = state.filter(item => !action.payload.find(obj => item.id === obj.id));
        return [...removeDuplicates, ...action.payload];
      }
      return state.findIndex(item => item.id === action.payload.id) === -1
        ? [...state, action.payload]
        : state;
    }

    case LIST_EDIT_ITEM: {
      const newState = [...state];
      const indexEdited = newState.findIndex(item => item.id === action.payload.id);
      newState[indexEdited] = {
        ...newState[indexEdited],
        ...action.payload,
      };
      return newState;
    }

    case LIST_CHECK_ITEM: {
      const newState = [...state];
      const indexOfChecked = newState.findIndex(item => item.id === action.payload);
      const newCheckedState =
        newState[indexOfChecked].checked !== undefined
          ? !newState[indexOfChecked].checked
          : true;
      newState[indexOfChecked] = {
        ...newState[indexOfChecked],
        checked: newCheckedState,
      };
      return newState;
    }

    case LIST_DEL_ITEMS: {
      return state.filter(item => !action.payload.includes(item.id));
    }

    default:
      return state;
  }
}
