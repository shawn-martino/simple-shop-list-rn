import alertsReducer from './alertsReducer';
import itemReducer from './itemReducer';
import listReducer from './listReducer';

function mockApi(state = { api_called: null }, action) {
  switch (action.type) {
    case 'GET_MOCK_ITEMS':
      return { ...state, api_called: true };

    case 'REJECT_MOCK_ITEMS':
      return { ...state, api_called: true };

    default:
      return state;
  }
}

export default {
  alerts: alertsReducer,
  items: itemReducer,
  list: listReducer,
  dev: mockApi,
};
