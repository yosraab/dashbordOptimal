const initialState=[
  {
    "_id": "5cffd8bc42075239040c73ca",
    "customer": "Marwa123",
    "qty": 2,
    "products": "Optimal Shop",
  },
  {
    "_id": "5cffd8bc42075239040c73ca",
    "customer": "Marwa123",
    "qty": 1,
    "products": "Optimal Waiter",
  },
  {
    "_id": "5cffd8bc42075239040c73ca",
    "customer": "Marwa123",
    "qty": 1,
    "products": "Optimal Market",
  },
]
function paniers(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_DEVICES_SUCCESS': {
      return action.payload;
    }
    default:
      return state;
  }
}

export default paniers;
