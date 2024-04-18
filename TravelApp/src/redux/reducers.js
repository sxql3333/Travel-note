import { combineReducers } from 'redux';
const initialState = {
  searchResults: [],
  userInfo: null,
  personalNotes: [],
  moreDiary: [],
};

const rootReducer = (state = initialState, action) => {
  console.log("action", action.type);
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: action.payload,
      };
    case 'SET_MORE_DIARY':
      return {
        ...state,
        moreDiary: [...state.moreDiary, ...action.payload], // 将 payload 追加到 moreDiary 数组中
      };
    case 'SAVE_USER_INFO':
      return {
        ...state,
        userInfo: {
          token:action.payload.token,
          user:action.payload.user
        }
      };
    case 'SAVE_PERSONAL_NOTES':
      return {
        ...state,
        personalNotes: action.payload,
      }
    default:
      return state;
  }
};

export default rootReducer;