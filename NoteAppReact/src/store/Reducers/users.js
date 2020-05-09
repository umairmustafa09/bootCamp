import ActionTypes from "../Actions/ActionTypes";

const INITIAL_STATE = {
  users: []
};

function users(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.GET_USERS: {
      return {
        ...state,
        obj: action.payload
      };
    }

    default:
      return state;
  }
}

export default users;
