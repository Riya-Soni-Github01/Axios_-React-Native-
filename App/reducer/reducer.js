
const initialState = {
  Data: null
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'addData':
      return {
        Data: action.payload
      };
    default:
      return state
  }
}