import {
  LIST_ADD_ITEM,
  LIST_GET_ITEMS,
  LIST_EDIT_ITEM,
  LIST_CHECK_ITEM,
  LIST_DEL_ITEMS,
} from './types';

// Add Item to List
export const listAddItem = item => ({
  type: LIST_ADD_ITEM,
  payload: item,
});

// Get List
export const listGetItems = items => ({
  type: LIST_GET_ITEMS,
  payload: items,
});

// Edit Item
export const listEditItem = item => ({
  type: LIST_EDIT_ITEM,
  payload: item,
});

// Delete Item(s)
export const deleteListItems = itemIds => ({
  type: LIST_DEL_ITEMS,
  payload: itemIds,
});

// Check List Item
export const listItemChecked = itemId => ({
  type: LIST_CHECK_ITEM,
  payload: itemId,
});
