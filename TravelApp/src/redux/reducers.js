import { combineReducers } from 'redux';
const initialState = {
  searchResults: [],
  userInfo: null,
};

const rootReducer = (state = initialState, action) => {
  console.log("action", action.type);
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: action.payload,
      };
    case 'SAVE_USER_INFO':
      return {
        ...state,
        userInfo: {
          token:action.payload.token,
          user:action.payload.user
        }
      };
    default:
      return state;
  }
};

export default rootReducer;