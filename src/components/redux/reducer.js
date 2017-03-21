export default function reducer(state, action){
  switch (action.type) {
    case "CALCULATE_WIDTH":
      return {
        gameWidth: (action.width>600)
              ? action.width-200
              : 400
        }
    default:
      return state;
  }
}
