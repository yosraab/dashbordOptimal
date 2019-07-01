function settings(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_SETTINGS_SUCCESS':
      return action.payload;
    case 'GET_SETTINGS_SUCCESS':
      return action.payload;
    default:
      return state;
  }
}

export default settings;
