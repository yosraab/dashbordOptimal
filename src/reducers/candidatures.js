

function candidatures(state =[], action) {
  switch (action.type) {
    case 'FETCH_CANDIDATURES_SUCCESS': {
      return action.payload;
    }
    default:
      return state;
  }
}

export default candidatures;
