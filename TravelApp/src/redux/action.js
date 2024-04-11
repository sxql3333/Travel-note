export const setSearchResults = (results) => ({
  type: 'SET_SEARCH_RESULTS',
  payload: results,
});
export const saveUserInfo = (user, token) => ({
  type: 'SAVE_USER_INFO',
  payload: { user, token },
});
export const savePersonalNotes = (notes) => ({
  type: 'SAVE_PERSONAL_NOTES',
  payload: notes,
})