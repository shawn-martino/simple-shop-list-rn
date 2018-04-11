import { ADD_ITEM, EDIT_ITEM, DEL_ITEM, SET_ITEMS } from './types';

// Mock Items
import itemsMock from '../config/mock_api';

export const getMockItems = () => ({
  type: 'GET_MOCK_ITEMS',
  payload: itemsMock,
});

export const rejectMockItems = () => ({
  type: 'REJECT_MOCK_ITEMS',
});

// Create Item
export const createItem = item => ({
  type: ADD_ITEM,
  payload: item,
});

// Get Items
export const getItems = items => ({
  type: SET_ITEMS,
  payload: items,
});

// Delete Item
export const deleteItem = id => ({
  type: DEL_ITEM,
  payload: id,
});

// Edit Item
export const editItem = item => ({
  type: EDIT_ITEM,
  payload: item,
});
