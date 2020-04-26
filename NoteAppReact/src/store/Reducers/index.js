import ActionTypes from "../Actions/ActionTypes";

const INITIAL_STATE = {
  notes: []
};

function addNotes(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.ADD_NOTE: {
      return {
        ...state,
        notes: action.payload
      };
    }

    default:
      return state;
  }
}

export default addNotes;
